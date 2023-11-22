import { Box, Stack } from "@mui/material";
import React from "react";
import Message from "./Message";

export default function MessagesDisplay({ chat = [] }) {
  const orderedChat = chat.sort((a, b) => a.time.seconds - b.time.seconds)
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
            <Message messageData={message} key={message.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
