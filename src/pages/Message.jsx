import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";

import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  updateDoc,
  where,
  getDoc
} from "firebase/firestore";

function Message() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [childRef, setChildRef] = useState(null)
  const [messageDocRef, setMessageDocRef] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  });

  useEffect(() => {
    getSubcollectionData();
  }, []);

  const collectionName = "letterbox"; // Replace "letterbox" with the actual collection name
  const splitUrl = window.location.href.split("/")
  const documentId = splitUrl[splitUrl.length - 1]; // Replace "documentIdFromParams" with the actual document ID from URL parameters

  const getSubcollectionData = async () => {
    try {
      const documentRef = doc(collection(firestore, collectionName), documentId);
      console.log(0)
      // errors for permissions here
      const documentSnapshot = await getDoc(documentRef);
      console.group(1)
      if (documentSnapshot.exists()) {
        const subcollectionRef = collection(documentRef, "letters");
        const subcollectionSnapshot = await getDocs(subcollectionRef);
        console.group(2)
        const messages = [];

        subcollectionSnapshot.forEach((subDoc) => {
          const letter = subDoc.data();
          messages.push({
            collectionId: subDoc.id,
            receiver: letter.members.filter(member => member !== auth.currentUser.uid),
            content: letter.content,
            deleted: letter.deleted_at,
            moderation: letter.moderation
          });
        });

        console.log(messages);
        return messages;
      } else {
        console.log("Document does not exist");
        return [];
      }
    } catch (error) {
      console.error("Error fetching subcollection data:", error);
      return [];
    }
  };



  // useEffect(() => {
  //   console.log("new id", childId)
  //   let isMounted = true;

  //   if (!childId) return
  //   const fetchData = async () => {
  //     try {
  //       const collectionRef = collection(firestore, "Chat");
  //       const chatBuddy = window.location.pathname.split("/messages/")[1];
  //       const intlBuddyRef = doc(collection(firestore, 'InternationalBuddy'), chatBuddy);
  //       const childReference = doc(collection(firestore, 'Child'), childId);
  //       setChildRef(childReference);

  //       const q = query(
  //         collectionRef,
  //         where("child", '==', childReference),
  //         where("international_buddy", '==', intlBuddyRef)
  //       );

  //       const docSnapshot = await getDocs(q);

  //       if (isMounted) {
  //         setMessageDocRef(docSnapshot);

  //         if (!docSnapshot.empty) {
  //           setMessage(docSnapshot.docs[0].data().Messages);
  //         }
  //       }
  //     } catch (e) {
  //       console.error('Error fetching chat:', e);
  //     }
  //   };

  //   fetchData();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, [childId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const newMessagePayload = {
      deleted_at: null,
      content: newMessage.trim(),
      moderated_at: null,
      content_type: "text",
      sender: childRef,
    };

    const updatedMessages = [...message, newMessagePayload];

    await updateDoc(messageDocRef.docs[0].ref, { Messages: updatedMessages });

    setMessage(updatedMessages);

    setNewMessage("");
  };
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
      </Stack>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <div>
        {user ? (
          <div>
            <MessagesComp chat={message} />
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} />
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Message;
