import { Box, Stack } from "@mui/material";
import React from "react";
import TextMessage from "./TextMessage";
import MediaMessage from "./MediaMessage";

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
          {chat.map((message, index) => (
            <div key={message.collectionId ?? index}>
              <p>{message.letter}</p>
              {message.attachments?.map(att => (
                <img src={att} />
              ))}
            </div>
            // message.content_type === "text" ? (
            //   <TextMessage messageData={message} key={message.id} />
            // ) : message.content_type === "media" ? (
            //   <MediaMessage messageData={message} key={message.id} />
            // ) : null
          ))}
        </Stack>
      </Box>
    </div>
  );
}
