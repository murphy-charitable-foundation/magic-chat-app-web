import { Box, Stack } from "@mui/material";
import React from "react";

export default function MessagesComp({ chat = [] }) {
  return (
    <div>
      <Box>
        <Stack
          direction="column"
          alignItems="stretch"
          spacing={2}
          minHeight="40vh"
          maxHeight="40vh"
          overflow="scroll"
          justifyContent="end"
        >
          {chat.map((message, i) => (
            <div key={i}>{message.messageContent} <span>{message.messageType}</span></div>
          ))}
        </Stack>
      </Box>
    </div>
  );
}
