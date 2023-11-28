import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import Message from "./Message";

export default function MessagesDisplay({ chat = [] }) {
  const orderedChat = chat.sort((a, b) => a.time.seconds - b.time.seconds);

  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date.seconds * 1000 + date.nanoseconds / 1e6);

    if (
      messageDate.getDate() === today.getDate() &&
      messageDate.getMonth() === today.getMonth() &&
      messageDate.getFullYear() === today.getFullYear()
    ) {
      return "Today";
    }
    const options = { weekday: "short", month: "short", day: "numeric" };
    return messageDate.toLocaleDateString("en-US", options);
  };

  const groupedMessages = Object.groupBy(orderedChat, (msg) => {
    return formatDate(msg.time);
  });

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
              <Box
                m="0 0 24px 0"
                sx={{
                  alignSelf: "center",
                  background: "#DDDDE9",
                  borderRadius: "8px",
                  width: "fit-content",
                  padding: "4px 24px",
                }}
              >
                <Typography color="#3C3C43" fontSize="12px">
                  {date}
                </Typography>
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
