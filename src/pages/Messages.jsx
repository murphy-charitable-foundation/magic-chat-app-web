import {
  Box,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";

import { firestore, auth } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  query,
  onSnapshot,
  getDocs,
  addDoc,
  serverTimestamp,
  where
} from "firebase/firestore";

const chatsRes = [];

const Messages = () => {
  const [chats, setChats] = useState(chatsRes);
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    if (!event) {
      setChats(chatsRes);
      return;
    }
    const newText = event.target.value;
    setSearchText(newText);
    const filteredChats = chatsRes.filter((chat) =>
      chat.name.toLowerCase().includes(newText.toLowerCase())
    );
    setChats(filteredChats);
  };

  const clearText = () => {
    setSearchText("");
    handleSearchTextChange();
  };

  const [connectedChats, setConnectedChats] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "Child");
        // get users email from auth
        const q = query(collectionRef, where("email", '==', 'penpalprogram.murphycharity@gmail.com'))
        const docRef = await getDocs(q)
        if (!docRef.empty) {
          const connectedChatsRef = docRef.docs[0].data()
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

  return (
    <Box>
      <Stack sx={{ marginBottom: "16px" }}>
        <Typography variant="h1">Chats</Typography>
      </Stack>
      <MessageBoard messages={connectedChats} />
    </Box>
  );
};

export default Messages;
