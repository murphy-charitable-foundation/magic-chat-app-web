import { Box, Stack } from "@mui/material";
import React from "react";
import Message from "./Message";

export default function MessagesDisplay({ chat = [] }) {
  const orderedChat = chat.sort((a, b) => a.time.seconds - b.time.seconds)
  /*
    This should seperate the messages by days
  */
  return (
    <div>
      <Box 
        maxHeight="40vh"
        overflow="scroll"
        justifyContent="end"
      >
        <Stack
          direction="column"
          spacing={2}
          minHeight="40vh"
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
