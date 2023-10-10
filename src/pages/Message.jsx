import { Avatar, Box, Link, Stack, TextField, Typography } from "@mui/material";
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

  return (
    <Box>
      <Stack direction="row" sx={{alignItems: "center"}}>
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
          <div>

            {message.messageContent}
          </div>
        ))}
      </Stack>
      </Box>
    </Box>
  );
}

export default Message;
