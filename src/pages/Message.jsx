import { MessageOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const receiver = {
  id: 1,
  name: "Festus",
  avatar: "./images/festus.jpeg",
};
const chatRes = [
  {
    messageContent: "Hello, Will",
    messageType: "receiver",
  },
  {
    messageContent: "Hey!",
    messageType: "sender",
  },
  {
    messageContent: "How are you?",
    messageType: "receiver",
  },
];

function Message(_props) {
  useEffect(() => {
    // fetch chat based on path
  }, []);
  const [chat, setChat] = useState(chatRes);
  const [latestMessage, setLatestMessage] = useState("");

  const updateChat = (msg) => {
    const currentMessages = [...chat];
    currentMessages.push(msg);
    setChat(currentMessages);
    setInputToNull();
  };
  const setInputToNull = () => {
    const node = document.getElementById("new-message");
    if(!node) return;
    console.log(node.value);
    node.value = "";
  }
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
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
      <Box>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {chat.map((message, i) => (
            <div key={i}>{message.messageContent}</div>
          ))}
        </Stack>
      </Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <TextField
        placeholder="Your Message..."
          onChange={(e) => {
            setLatestMessage(e.target.value);
          }}
          id="new-message"
        ></TextField>
        <Button
          onClick={() => {
            updateChat({
              messageType: "sender",
              messageContent: latestMessage,
            });
          }}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default Message;
