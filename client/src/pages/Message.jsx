import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";

const receiver = {
  id: 1,
  name: "Festus",
  avatar: "./images/festus.jpeg",
};
// this is based on the Flutter fake res
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

function Message({ socket }) {
  useEffect(() => {
    const handleNewMessage = (msg) => {
      // this is simulating where we would have a service to post the mmessage to the DB, then
      // retrieve this from the db in another fn - that will tell socket a nnew mmessage has come.
      setChat(prevChat => [...prevChat, msg])
    };
    if (socket) {
      socket.on("newMessage", handleNewMessage);
    }
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket]);

  const [chat, setChat] = useState(chatRes);
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
      <MessagesComp chat={chat} />
      <NewMessage socket={socket} />
    </Box>
  );
}

export default Message;
