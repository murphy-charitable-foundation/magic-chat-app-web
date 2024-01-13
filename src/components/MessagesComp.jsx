import { Box, Stack } from "@mui/material";
import React from "react";
import MessageComp from "./MessageComp";

export default function MessagesComp({ chat = [] }) {
  const filteredChat = chat
  // const orderedChat = filteredChat.sort((a, b) => a.time.seconds - b.time.seconds)
  const orderedChat = filteredChat
  return (
    <div>
      <Box>
        <Stack
          direction="column"
          spacing={2}
          minHeight="40vh"
          maxHeight="40vh"
          overflow="scroll"
          justifyContent="end"
        >
          {orderedChat.map((message) => (
            <MessageComp messageData={message} key={message.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
