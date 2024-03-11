import { Box, Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";
import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  addDoc,
  orderBy,
  limit,
  startAfter,
  updateDoc
} from "firebase/firestore";
import ImageThumbnail from "../components/ImageThumbnail";

const PAGE_SIZE = 1;

const parseLetterInfo = (id, letter, pending=false) => ({
  collectionId: id,
  attachments: letter.attachments,
  letter: letter.letter,
  sent_by: letter.sent_by,
  status: letter.status,
  created_at: letter.created_at,
  moderation: letter.moderation_comments,
  pending
})

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([])
  const [messageDocRef, setMessageDocRef] = useState(null)
  const [userSet, setUserSet] = useState(false)
  const [lastMessageDoc, setLastMessageDoc] = useState(null);
  const [chatId, setChatId] = useState("");
  const [draft, setDraft] = useState(null)

  useEffect(() => {
    findUser()
  }, [userSet]);

  const findUser = async () => {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    const userDocRef = doc(firestore, "users", user.uid);
    setUser(userDocRef)
    setUserSet(true);
  };

  const collectionName = "letterbox";
  const splitUrl = window.location.href.split("/")
  const letterboxId = splitUrl[splitUrl.length - 1]

  useEffect(() => {
    if (letterboxId) {
      setChatId(letterboxId)
    }
    getSubData()
  }, [userSet]);

  const getSubData = async () => {
    if (!user) {
      await findUser()
    }
    try {
      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const subcollectionRe = collection(documentRe, "letters");
      const q = query(
        subcollectionRe,
        where("status", "==", 'sent'),
        where("deleted_at", '==', null),
        orderBy("created_at", "desc"),
        limit(PAGE_SIZE)
      );
      const subcollectionSnapshott = await getDocs(q);
      if (subcollectionSnapshott.empty) {
        setMessageDocRef(documentRe)
        return [];
      }

      const msgs = [];
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push({
          collectionId: subDoc.id,
          attachments: letter.attachments,
          letter: letter.letter,
          sent_by: letter.sent_by,
          status: letter.status,
          created_at: letter.created_at,
          moderation: letter.moderation_comments,
        });
        console.log('letter', letter)
        setLastMessageDoc(subDoc);
      });
      if (user) {
        console.log('user found in get sub data')
        const pendingQ = query(
          subcollectionRe,
          where("status", "==", 'pending_review'),
          where("deleted_at", '==', null),
          orderBy("created_at", "desc"),
          where("sent_by", "==", user),
          limit(PAGE_SIZE)
        );
        const pendingSubcollectionSnapshott = await getDocs(pendingQ);
        if (!pendingSubcollectionSnapshott.empty) {
          pendingSubcollectionSnapshott.forEach((subDoc) => {
            const letter = subDoc.data();
            msgs.push({
              collectionId: subDoc.id,
              attachments: letter.attachments,
              letter: letter.letter,
              sent_by: letter.sent_by,
              status: letter.status,
              created_at: letter.created_at,
              moderation: letter.moderation_comments,
              pending: true
            });
          })
        }
      }
      setMessages(msgs)
      setMessageDocRef(documentRe)

      const draftQuery = query(
        subcollectionRe,
        where("status", "==", "draft"),
        where("deleted_at", "==", null),
        where("sent_by", "==", user),
        orderBy("created_at", "desc"),
        limit(1)
      );

      const draftSnapshot = await getDocs(draftQuery);
      if (!draftSnapshot.empty) {
        const draftData = draftSnapshot.docs[0].data();
        setDraft({
          id: draftSnapshot.docs[0].id,
          attachments: draftData.attachments,
          letter: draftData.letter
        });
      } else {
        setDraft(null);
      }

      return msgs;
    } catch (error) {
      console.error("Error fetching subcollection data:", error);
      return [];
    }
  };

  const fetchNextMessage = async () => {
    try {
      if (!lastMessageDoc) return;

      const subcollectionRe = collection(messageDocRef, "letters");
      const q = query(subcollectionRe,
        where("status", "==", 'sent'),
        orderBy("created_at", "desc"),
        where("deleted_at", '==', null),
        where("sent_by", "==", user),
        startAfter(lastMessageDoc),
        limit(PAGE_SIZE)
      );
      const subcollectionSnapshott = await getDocs(q);

      if (subcollectionSnapshott.empty) {
        console.log("No more messages available.");
        return;
      }

      const newMessage = subcollectionSnapshott.docs[0].data();
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setLastMessageDoc(subcollectionSnapshott.docs[0]); // Update last document for next pagination
    } catch (e) {
      console.error("Error fetching next message:", e);
    }
  };

  const sendMessage = async (e, status = 'pending_review') => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!user) return;

    try {
      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const subcollectionRe = collection(documentRe, "letters");
      const q = query(
        subcollectionRe,
        where("status", "==", 'sent'),
        where("deleted_at", '==', null),
        orderBy("created_at", "desc"),
        limit(PAGE_SIZE)
      );
      const subcollectionSnapshott = await getDocs(q);
      if (subcollectionSnapshott.empty) {
        setMessageDocRef(documentRe)
        return [];
      }

      const msgs = [];
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push(parseLetterInfo(subDoc.id, letter))
        setLastMessageDoc(subDoc);
      });
      if (user) {
        console.log('user found in get sub data')
        const pendingQ = query(
          subcollectionRe,
          where("status", "==", 'pending_review'),
          where("deleted_at", '==', null),
          orderBy("created_at", "desc"),
          where("sent_by", "==", user),
          limit(PAGE_SIZE)
        );
        const pendingSubcollectionSnapshott = await getDocs(pendingQ);
        if (!pendingSubcollectionSnapshott.empty) {
          pendingSubcollectionSnapshott.forEach((subDoc) => {
            const letter = subDoc.data();
            msgs.push(parseLetterInfo(subDoc.id, letter, true))
          })
        }
      }
      setMessages(msgs)
      if (draft) {
        await updateDoc(doc(collection(messageDocRef, "letters"), draft.id), {
          letter: newMessage,
          status
        });
      } else {
        await addDoc(collection(messageDocRef, "letters"), {
          deleted_at: null,
          letter: newMessage,
          created_at: new Date(),
          status,
          sent_by: user,
          attachments: imagePreviewUrl
        });
      }

      setNewMessage("");
      setDraft(null);
      setImagePreviewUrl([]);

      getSubData();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const sendImageMessage = async (url) => {
    setImagePreviewUrl([url, ...imagePreviewUrl])
    if (!userSet) {
      await findUser()
    }
  }
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button onClick={fetchNextMessage}>Fetch Next Message</Button>
      </Stack>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <div>
        {user ? (
          <div>
            <MessagesComp chat={messages} />
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} onUploadComplete={sendImageMessage} chatId={chatId} draft={draft} />
            {imagePreviewUrl.map(img => <ImageThumbnail url={img} />)}
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Messages;


// import { Box, Button, Stack, Typography } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import MessagesComp from "../components/MessagesComp";
// import NewMessage from "../components/NewMessage";
// import { firestore, auth } from "../firebase";
// import {
//   collection,
//   query,
//   getDocs,
//   doc,
//   where,
//   addDoc,
//   orderBy,
//   limit,
//   updateDoc
// } from "firebase/firestore";
// import ImageThumbnail from "../components/ImageThumbnail";
// import { fetchPendingReviewMessages } from "../utils/firestore";

// const PAGE_SIZE = 10;

// function Messages() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");
//   const [user, setUser] = useState(null);
//   const [imagePreviewUrl, setImagePreviewUrl] = useState([]);
//   const [messageDocRef, setMessageDocRef] = useState(null);
//   const [lastMessageDoc, setLastMessageDoc] = useState(null);
//   const [chatId, setChatId] = useState("");
//   const [draft, setDraft] = useState(null);
//   const [userSet, setUserSet] = useState(false)


//   useEffect(() => {
//     findUser();
//   }, [userSet]);

//   useEffect(() => {
//     if (letterboxId) {
//       setChatId(letterboxId)
//     }
//     getSubData()
//   }, [userSet]);

//   const findUser = async () => {
//     const user = await new Promise((resolve, reject) => {
//       const unsubscribe = auth.onAuthStateChanged((user) => {
//         resolve(user);
//         unsubscribe();
//       }, reject);
//     });

//     if (!user) {
//       console.log("User not found");
//       return;
//     }

//     const userDocRef = doc(firestore, "users", user.uid);
//     setUser(userDocRef);
//     getSubData();
//   };

//   const collectionName = "letterbox";
//   const splitUrl = window.location.href.split("/");
//   const letterboxId = splitUrl[splitUrl.length - 1];

//   const getSubData = async () => {
//     console.log('fetching', user, letterboxId)
//     if (!letterboxId || !user) {
//       return []
//     }

//     try {
//       const documentRe = doc(collection(firestore, collectionName), letterboxId);
//       const subcollectionRe = collection(documentRe, "letters");
//       console.log("collecting messages")

//       const q = query(
//         subcollectionRe,
//         where("status", "==", 'sent'),
//         where("deleted_at", '==', null),
//         orderBy("created_at", "desc"),
//         limit(PAGE_SIZE)
//       );
//       const subcollectionSnapshott = await getDocs(q);
//       if (subcollectionSnapshott.empty) {
//         setMessageDocRef(documentRe)
//         return [];
//       }

//       const msgs = [];
//       console.log(subcollectionSnapshott)
//       subcollectionSnapshott.forEach((subDoc) => {
//         const letter = subDoc.data();
//         msgs.push({
//           collectionId: subDoc.id,
//           attachments: letter.attachments,
//           letter: letter.letter,
//           sent_by: letter.sent_by,
//           status: letter.status,
//           created_at: letter.created_at,
//           moderation: letter.moderation_comments,
//         });
//         console.log('letter', letter)
//         setLastMessageDoc(subDoc);
//       });
//       if (user) {
//         console.log('user found in get sub data')
//         const pendingMessages = await fetchPendingReviewMessages(subcollectionRe, user)
//         pendingMessages.forEach(m => msgs.push(m))
//         // const pendingQ = query(
//         //   subcollectionRe,
//         //   where("status", "==", 'pending_review'),
//         //   where("deleted_at", '==', null),
//         //   orderBy("created_at", "desc"),
//         //   where("sent_by", "==", user),
//         //   limit(PAGE_SIZE)
//         // );
//         // const pendingSubcollectionSnapshott = await getDocs(pendingQ);
//         // if (!pendingSubcollectionSnapshott.empty) {
//         //   pendingSubcollectionSnapshott.forEach((subDoc) => {
//         //     const letter = subDoc.data();
//         //     msgs.push({
//         //       collectionId: subDoc.id,
//         //       attachments: letter.attachments,
//         //       letter: letter.letter,
//         //       sent_by: letter.sent_by,
//         //       status: letter.status,
//         //       created_at: letter.created_at,
//         //       moderation: letter.moderation_comments,
//         //       pending: true
//         //     });
//         //   })
//         // }
//       }
//       setMessages(msgs)
//       const documentRef = doc(collection(firestore, collectionName), letterboxId);
//       const subcollectionRef = collection(documentRef, "letters");

//       const draftQuery = query(
//         subcollectionRef,
//         where("status", "==", "draft"),
//         where("deleted_at", "==", null),
//         where("sent_by", "==", user),
//         orderBy("created_at", "desc"),
//         limit(1)
//       );

//       const draftSnapshot = await getDocs(draftQuery);

//       if (!draftSnapshot.empty) {
//         const draftData = draftSnapshot.docs[0].data();
//         setDraft({
//           id: draftSnapshot.docs[0].id,
//           attachments: draftData.attachments,
//           letter: draftData.letter
//         });
//       } else {
//         setDraft(null);
//       }

//       setMessageDocRef(documentRef);
//     } catch (error) {
//       console.error("Error fetching subcollection data:", error);
//     }
//   };

//   const sendMessage = async (e, status = 'pending_review') => {
//     e.preventDefault();
//     if (!newMessage.trim()) return;
//     if (!user) return;

//     try {
//       const documentRe = doc(collection(firestore, collectionName), letterboxId);
//       const subcollectionRe = collection(documentRe, "letters");
//       const q = query(
//         subcollectionRe,
//         where("status", "==", 'sent'),
//         where("deleted_at", '==', null),
//         orderBy("created_at", "desc"),
//         limit(PAGE_SIZE)
//       );
//       const subcollectionSnapshott = await getDocs(q);
//       if (subcollectionSnapshott.empty) {
//         setMessageDocRef(documentRe)
//         return [];
//       }

//       const msgs = [];
//       subcollectionSnapshott.forEach((subDoc) => {
//         const letter = subDoc.data();
//         msgs.push({
//           collectionId: subDoc.id,
//           attachments: letter.attachments,
//           letter: letter.letter,
//           sent_by: letter.sent_by,
//           status: letter.status,
//           created_at: letter.created_at,
//           moderation: letter.moderation_comments,
//         });
//         console.log('letter', letter)
//         setLastMessageDoc(subDoc);
//       });
//       if (user) {
//         console.log('user found in get sub data')
//         const pendingQ = query(
//           subcollectionRe,
//           where("status", "==", 'pending_review'),
//           where("deleted_at", '==', null),
//           orderBy("created_at", "desc"),
//           where("sent_by", "==", user),
//           limit(PAGE_SIZE)
//         );
//         const pendingSubcollectionSnapshott = await getDocs(pendingQ);
//         if (!pendingSubcollectionSnapshott.empty) {
//           pendingSubcollectionSnapshott.forEach((subDoc) => {
//             const letter = subDoc.data();
//             msgs.push({
//               collectionId: subDoc.id,
//               attachments: letter.attachments,
//               letter: letter.letter,
//               sent_by: letter.sent_by,
//               status: letter.status,
//               created_at: letter.created_at,
//               moderation: letter.moderation_comments,
//               pending: true
//             });
//           })
//         }
//       }
//       setMessages(msgs)
//       if (draft) {
//         await updateDoc(doc(collection(messageDocRef, "letters"), draft.id), {
//           letter: newMessage,
//           status
//         });
//       } else {
//         await addDoc(collection(messageDocRef, "letters"), {
//           deleted_at: null,
//           letter: newMessage,
//           created_at: new Date(),
//           status,
//           sent_by: user,
//           attachments: imagePreviewUrl
//         });
//       }

//       setNewMessage("");
//       setDraft(null);
//       setImagePreviewUrl([]);

//       getSubData();
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   const sendImageMessage = (url) => {
//     setImagePreviewUrl([url, ...imagePreviewUrl]);
//   };

//   return (
//     <Box>
//       <Stack direction="row" sx={{ alignItems: "center" }}>
//         <Button onClick={getSubData}>Refresh Messages</Button>
//       </Stack>
//       <Typography variant="paragragh" paddingX={2} marginX={2}>
//         <hr />
//       </Typography>
//       <div>
//         {user ? (
//           <div>
//             <MessagesComp chat={messages} />
//             <NewMessage
//               setNewMessage={setNewMessage}
//               sendMessage={sendMessage}
//               newMessage={newMessage}
//               onUploadComplete={sendImageMessage}
//               chatId={chatId}
//               draft={draft}
//             />
//             {imagePreviewUrl.map(img => <ImageThumbnail url={img} />)}
//           </div>
//         ) : (
//           <div>not logged in</div>
//         )}
//       </div>
//     </Box>
//   );
// }

// export default Messages;
