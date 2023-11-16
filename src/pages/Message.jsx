import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";

import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

function Message() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  });

  useEffect(() => {
    const messageRef = collection(firestore, "letterbox");
    const q = query(messageRef);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(async (doc) => {
        const subcollectionRef = collection(doc.ref, "letters");
        const subcollectionDocs = await getDocs(subcollectionRef);
        const subcollectionData = subcollectionDocs.docs.map((subDoc) => ({
          subId: subDoc.id,
          ...subDoc.data(),
        }));
        return {
          id: doc.id,
          mainCollectionData: doc.data(),
          subcollectionData,
        };
      });
      Promise.all(messages).then((resolvedMessages) => {
        setMessage(resolvedMessages);
      });
    });
  
    return unsubscribe;
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const letterboxCollection = collection(firestore, "letterbox");
    const letterboxDocRef = await addDoc(letterboxCollection, {
      // Add any data specific to the "letterbox" document
    });

    const lettersSubcollectionRef = collection(letterboxDocRef, "letters");

    await addDoc(lettersSubcollectionRef, {
      letter: newMessage,
      time: serverTimestamp(),
      sentby: auth.currentUser.uid,
      type: "text",
    });

    setNewMessage("");
  };
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        {/* <Avatar
          src={receiver.avatar}
          alt={receiver.name}
          sx={{ alignContent: "end", marginRight: "12px" }}
        />
        <Typography variant="h3">{receiver.name}</Typography> */}
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
