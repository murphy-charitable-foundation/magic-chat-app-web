import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";

import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  orderBy,
  limit,
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
    console.log("q", q);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs.map(async (doc) => {
        const subcollectionRef = collection(doc.ref, "letters");
        const subcollectionDocs = await getDocs(subcollectionRef);

        return {
          id: doc.id,
          mainCollectionData: doc.data(),
          subcollectionData: subcollectionDocs.docs.map((subDoc) => ({
            subId: subDoc.id,
            ...subDoc.data(),
          })),
        };
      });
      Promise.all(messages).then((resolvedMessages) => {
        setMessage(resolvedMessages);
      });
      console.log(messages);
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
    console.log(auth.currentUser)

    setNewMessage("");
  };
  return (
    <Box>
      {/* <Stack direction="row" sx={{ alignItems: "center" }}>
        <Avatar
          src={receiver.avatar}
          alt={receiver.name}
          sx={{ alignContent: "end", marginRight: "12px" }}
        />
        <Typography variant="h3">{receiver.name}</Typography>
      </Stack>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <MessagesComp chat={[]} />
      <NewMessage /> */}
      <div>
        {user ? (
          <div>
            {message.map((msg, i) => (
              <div>
                <div key={msg.id ?? i}>
                  <p>Sent by: {msg.subcollectionData[0].sentby}</p>
                  <p>{msg.subcollectionData[0].letter}</p>
                  {JSON.stringify(msg)}
                </div>
              </div>
            ))}
            <form onSubmit={sendMessage}>
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Message;
