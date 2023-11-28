import { Box, Stack } from "@mui/material";
import React from "react";
import Message from "./Message";

export default function MessagesDisplay({ chat = [] }) {
  const orderedChat = chat.sort((a, b) => a.time.seconds - b.time.seconds);
  const groupedMessages = Object.groupBy(orderedChat, msg => {
    const date = new Date(
      msg.time.seconds * 1000 + msg.time.nanoseconds / 1e6
    );
    return date.toDateString();
  })
  return (
    <div>
      <Box maxHeight="40vh" overflow="scroll" justifyContent="end">
        <Stack
          direction="column"
          spacing={2}
          minHeight="40vh"
          justifyContent="end"
          paddingTop="24px"
        >
          {Object.entries(groupedMessages).map(([date, messages]) => (
            <React.Fragment key={date}>
              <Box>
                <strong>{date}</strong>
              </Box>
              {messages.map((message) => (
                <Message messageData={message} key={message.id} />
              ))}
            </React.Fragment>
          ))}
        </Stack>
      </Box>
    </div>
  );
}
