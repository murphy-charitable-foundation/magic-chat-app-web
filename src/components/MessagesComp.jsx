import { Box, Stack } from "@mui/material";
import React from "react";
import MessageComp from "./MessageComp";

export default function MessagesComp({ chat = [] }) {
  return (
    <div>
      <Box overflow="auto" minHeight="40vh" maxHeight="40vh">
        <Stack
          flexDirection="column"
          spacing={2}
          minHeight="100%"
          overflow="scroll"
        >
          {chat.map((message) => (
            <MessageComp messageData={message} key={message.id} />
          ))}
        </Stack>
      </Box>
    </div>
  );
}
