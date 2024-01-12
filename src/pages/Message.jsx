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
  where
} from "firebase/firestore";

function Message() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [connectedChat, setConnectedChat] = useState([]);
  const [childId, setChildId] = useState("");



  useEffect(() => {
    const fetchData = async () => {
      console.log("new page")
      try {
        const collectionRef = collection(firestore, "Child");
        // get users email from auth
        const q = query(collectionRef, where("email", '==', 'penpalprogram.murphycharity@gmail.com'))
        const docRef = await getDocs(q)
        if (!docRef.empty) {
          setChildId(docRef.docs[0].id)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
      console.log(childId)
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("new chld Id")
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "Chat")
        const chatBuddy = window.location.pathname.split("/messages/")[1]
        const q = query(
          collectionRef,
          where("child", '==', `/Child/${childId}`),
          where("international_buddy", '==', `/InternationalBuddy/${chatBuddy}`)
        )
        const docRef = await getDocs(q)
        console.log(docRef, `/Child/${childId}`, `/InternationalBuddy/${chatBuddy}`)
        if (!docRef.empty) {
          console.log(docRef.docs[0].data())
        } else {
          console.error("Fetching chat failed")
        }
      } catch (e) {
        console.error('Error fetching chat:', e);
      }
    }
    fetchData();
  }, [childId])

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
