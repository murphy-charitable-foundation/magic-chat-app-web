import { Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

export default function NewMessage({ socket }) {
  const [latestMessage, setLatestMessage] = useState("");

  const updateChat = (msg) => {
    socket.emit("newMessage", msg);
    setInputToNull();
    setLatestMessage("");
  };

  const setInputToNull = () => {
    const node = document.getElementById("new-message");
    if (!node) return;
    node.value = "";
  };
  return (
    <Stack direction="row" sx={{ alignItems: "center", marginTop: "12px" }}>
      <TextField
        placeholder="Your Message..."
        onChange={(e) => {
          setLatestMessage(e.target.value);
        }}
        id="new-message"
        sx={{
          flex: 1
        }}
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
