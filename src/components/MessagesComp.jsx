import { Box, Stack } from "@mui/material";
import React from "react";
import MessageComp from "./MessageComp";

export default function MessagesComp({ chat = [] }) {
  const filteredChat = chat.filter(msg => msg.subcollectionData.length)
  const orderedChat = filteredChat.sort((a, b) => a.subcollectionData[0].time.seconds - b.subcollectionData[0].time.seconds)
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
