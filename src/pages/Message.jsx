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

const PAGE_SIZE = 10;

function Messages() {
  const [messages, setMessage] = useState([]);
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
    if(!user){
      console.log('finding user')
      await findUser()
    }
    try {
      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const subcollectionRe = collection(documentRe, "letters");
      console.log("collecting messages")
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
      console.log(subcollectionSnapshott)
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
      setMessage(msgs)
      console.log('get data', messages)
      setMessageDocRef(documentRe)

      const draftQ = query(
        subcollectionRe,
        where("status", "==", 'draft'),
        where("deleted_at", '==', null),
        orderBy("created_at", "desc"),
        where("sent_by", "==", user),
        limit(1)
      );

      const draftSnapshott = await getDocs(draftQ);
      console.log("get draft", draftSnapshott)
        if (!draftSnapshott.empty) {
          draftSnapshott.forEach((subDoc) => {
            const letter = subDoc.data();
            console.log(letter)
            setDraft({
              attachments: subDoc.attachments,
              letter: letter.letter,
              collectionId: letter.id,
            })
          })
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
        startAfter(lastMessageDoc),
        limit(PAGE_SIZE)
      );
      console.log(lastMessageDoc)
      const subcollectionSnapshott = await getDocs(q);

      if (subcollectionSnapshott.empty) {
        console.log("No more messages available.");
        return;
      }
      console.log(subcollectionSnapshott.length)

      const newMessage = subcollectionSnapshott.docs[0].data();
      setMessage(prevMessages => [...prevMessages, newMessage]);
      setLastMessageDoc(subcollectionSnapshott.docs[0]); // Update last document for next pagination
    } catch (error) {
      console.error("Error fetching next message:", error);
    }
  };

  const deleteDrafts = async () => {
    console.log('deleting drafts')
    try {
      if (!user) return;
/*
  * TO DO
  * we want 1 draft and we update this with a status of 'draft'
  * when we hit send, we update this to be a status of 'pending_review'
  * no deleting required
  * we just track this 1 draft until sent as a state
*/
      console.log('deleting drafts')
      const userDocRef = doc(collection(firestore, "users"), user);
      const subcollectionRe = collection(messageDocRef, "letters");
      const draftQ = query(
        subcollectionRe,
        where("status", "==", "draft"),
        where("deleted_at", "==", null),
        where("sent_by", "==", userDocRef)
      );
  
      const draftSnapshott = await getDocs(draftQ);
    console.log('length', draftSnapshott.length)
      draftSnapshott.forEach(async (subDoc) => {
        await updateDoc(doc(subcollectionRe, subDoc.id), { deleted_at: new Date() });
      });
  
      console.log("Drafts with user ID", user, "deleted.");
    } catch (error) {
      console.error("Error deleting drafts:", error);
    }
  };

  const sendMessage = async (e, status='pending_review') => {
    console.log(status)
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!userSet) await findUser()
    try {
      const newMessagePayload = {
        deleted_at: null,
        letter: newMessage,
        created_at: new Date(),
        status,
        sent_by: user,
        attachments: imagePreviewUrl
      };
      const updatedMessages = [...messages, newMessagePayload];
      const subcollectionRef = collection(messageDocRef, "letters");
      await addDoc(subcollectionRef, newMessagePayload);

      console.log("Updated messages:", updatedMessages);

      if (!messageDocRef) {
        throw new Error("Message document reference not found.");
      }
      await deleteDrafts()
      await getSubData()
      if(status !== 'draft'){
        setNewMessage("");
      }
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
