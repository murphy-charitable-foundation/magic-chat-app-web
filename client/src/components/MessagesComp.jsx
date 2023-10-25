import { Box, Stack } from "@mui/material";
import React from "react";

export default function MessagesComp({socket, chat=[]}){
  return (
    <div>
      <Box>
        <Stack
          direction="column"
          justifyContent="flex-start"
          alignItems="stretch"
          spacing={2}
        >
          {chat.map((message, i) => (
            <div key={i}>{message.messageContent}</div>
          ))}
        </Stack>
      </Box>
    </div>
  )
}