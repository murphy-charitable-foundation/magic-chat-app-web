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

  return (
    <Box>
      <Stack
        sx={{
          marginBottom: "16px",
        }}
      >
        <Typography variant="h1">Chats</Typography>
        <TextField
          id="outlined-basic"
          variant="standard"
          placeholder="Search"
          fullWidth
          value={searchText}
          onChange={handleSearchTextChange}
          InputProps={{
            disableUnderline: true,
            style: {
              outline: "none",
              borderRadius: "12px 12px 0px 0px",
              borderBottom: "solid #000",
            },
            startAdornment: (
              <InputAdornment position="start">
                <IconButton sx={{ pointerEvents: "none" }}>
                  <SearchIcon sx={{ fill: "#3F4945" }} />
                </IconButton>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {searchText && (
                  <IconButton onClick={clearText}>
                    <HighlightOffIcon />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      {/* {<MessageBoard messages={_messages} />} */}
    </Box>
  );
};

export default Messages;
