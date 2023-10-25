import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export default function NewMessage({ socket }) {
  const [latestMessage, setLatestMessage] = useState("");

  const updateChat = (msg) => {
    const currentMessages = [];
    socket.connect();
    socket.emit("newMessage", msg);
    currentMessages.push(msg);
    setInputToNull();
    setLatestMessage("");
  };
  

  const setInputToNull = () => {
    const node = document.getElementById("new-message");
    if (!node) return;
    node.value = "";
  };
  return (
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
  );
}
