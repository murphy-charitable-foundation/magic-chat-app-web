import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import MessageBoard from "../components/MessageBoard";

const chatsRes = [
  {
    name: "Festus",
    imgSrc: "./images/festus.jpg",
    lastMessage: "Hey, How are you?",
    timestamp: "12:01",
    senderId: 1,
  },
  {
    name: "Charlie",
    imgSrc: "./images/example-1.jpeg",
    lastMessage: "Hey, How are you?",
    timestamp: "11:10",
    senderId: 2,
  },
];

const Messages = () => {
  const [chats, setChats] = useState(chatsRes);
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    const newText = event.target.value;
    setSearchText(newText);
    const filteredChats = chatsRes.filter((chat) =>
      chat.name.toLowerCase().includes(newText.toLowerCase())
    );
    setChats(filteredChats);
  };

  return (
    <Box>
      <Typography variant="h1">Chats</Typography>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        fullWidth
        value={searchText}
        onChange={handleSearchTextChange}
      />
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <MessageBoard messages={chats} />
    </Box>
  );
};

export default Messages;
