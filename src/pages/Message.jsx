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

function Messages() {
  const [messages, setMessage] = useState([]);
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
    getSubData()
  }, []);

  const collectionName = "letterbox"; // Replace "letterbox" with the actual collection name
  const splitUrl = window.location.href.split("/")
  const letterboxId = splitUrl[splitUrl.length - 1]
  // const letterboxId = splitUrl[splitUrl.length - 1]; // Replace "letterboxIdFromParams" with the actual document ID from URL parameters

  const getSubcollectionData = async () => {
    try {
      const documentRef = doc(collection(firestore, collectionName), letterboxId);
      console.log(0)
      // errors for permissions here
      const documentSnapshot = await getDoc(documentRef);
      console.log(1)
      if (documentSnapshot.exists()) {
        const subcollectionRef = collection(documentRef, "letters");
        const subcollectionSnapshot = await getDocs(subcollectionRef);
        console.log(2)
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

  const getSubData = async () => {
    try {
      const collectionRef = collection(firestore, collectionName);
      const querySnapshot = await getDocs(query(collectionRef, where("letterboxId", "==", letterboxId)));

      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const documentSnapshot = await getDoc(documentRe);

      console.log(documentSnapshot)

      const subcollectionRe = collection(documentRe, "letters");
      console.log(subcollectionRe)
      const subcollectionSnapshott = await getDocs(subcollectionRe);
      console.log(subcollectionSnapshott)
      
      if (subcollectionSnapshott.empty) {
        console.log("No documents found.");
        return [];
      }
  

  
      const msgs = [];
  
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push({
          collectionId: subDoc.id,
          // receiver: letter.members.filter(member => member !== auth.currentUser.uid),
          content: letter.content,
          content_type: letter.content_type,
          deleted: letter.deleted_at,
          moderation: letter.moderation
        });
      });
  
      setMessage(msgs)
      return messages;
    } catch (error) {
      console.error("Error fetching subcollection data:", error);
      return [];
    }
  };

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

    const updatedMessages = [...messages, newMessagePayload];

    await updateDoc(messageDocRef.docs[0].ref, { Message: updatedMessages });

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
            <MessagesComp chat={messages} />
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} />
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Messages;
