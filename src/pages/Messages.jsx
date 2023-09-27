import { Avatar, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const chatsRes = [
  {
    name: "Festus",
    imgSrc: "./images/festus.jpg",
    lastMessage: "Hey, How are you?",
    timestamp: "12:01",
  },
  {
    name: "Charlie",
    imgSrc: "./images/example-1.jpeg",
    lastMessage: "Hey, How are you?",
    timestamp: "11:10",
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
      <Stack
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        {chats.map((chat, i) => (
          <Box key={i}>
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt={chat.name}
                sx={{ alignContent: "end" }}
                src={chat.imgSrc}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="stretch"
                spacing={2}
              >
                <Typography variant="h5" sx={{ fontWeight: "bold", mt: 0 }}>
                  {chat.name}
                </Typography>
                <Typography variant="paragragh">{chat.lastMessage}</Typography>
              </Stack>
              <Typography
                variant="paragraph"
                sx={{
                  fontStyle: "italic",
                  alignSelf: "flex-start",
                  flex: 1,
                  textAlign: "end",
                }}
              >
                {chat.timestamp}
              </Typography>
            </Stack>
            <Typography variant="paragragh" paddingX={2} marginX={2}>
              <hr />
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
};

export default Messages;
