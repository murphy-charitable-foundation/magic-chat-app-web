import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";

import { firestore } from "../firebase";
import {
  collection,
  query,
  getDocs,
  getDoc,
  doc,
  where
} from "firebase/firestore";

const Messages = () => {
  const [connectedChats, setConnectedChats] = useState([]);
  const [childId, setChildId] = useState("");
  const [connectedChatsObjects, setConnectedChatsObjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "Child");
        // get users email from auth ===> auth.email
        const q = query(collectionRef, where("email", '==', 'penpalprogram.murphycharity@gmail.com'))
        const docRef = await getDocs(q)
        if (!docRef.empty) {
          const connectedChatsRef = docRef.docs[0].data()
          setChildId(docRef.docs[0].id)
          console.log("docs 0 ", docRef.docs[0])
          connectedChatsRef?.connected_chats.forEach(chat => {
            setConnectedChats([...connectedChats, chat])
          })
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async (chatId) => {
      const idSplit = chatId.split("Chat/")
      console.log(idSplit[1])
      try { 
        const chatCol = doc(firestore, "Chat", idSplit[1])
        const docRef = await getDoc(chatCol);
        if (docRef.exists()) {
          setConnectedChatsObjects(
            [...connectedChatsObjects, {
              name: docRef.data().international_buddy,
              lastMessage: docRef.data().Messages[docRef.data().Messages.length - 1]
            }]
          )
        }
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };
    for(const chat of connectedChats){
      fetchUserData(chat);
    }
  }, [childId]);

  return (
    <Box>
      <Stack sx={{ marginBottom: "16px" }}>
        <Typography variant="h1">Chats</Typography>
      </Stack>
      <MessageBoard messages={connectedChatsObjects} />
    </Box>
  );
};

export default Messages;
