import { Box, Typography } from "@mui/material";
import React from "react";
import { auth } from "../firebase";

const styling = {
  sender: {
    padding: "5px 8px 26px 16px",
    background: "#D2E8C2",
    alignSelf: "flex-end",
    borderRadius: "12px",
    boxShadow: "#dfdfdf 0px 2px 2px",
    margin: "0 1px 12px 0 !important",
    position: "relative",
    minWidth: "55%",
  },
  receiver: {
    padding: "5px 8px 26px 16px",
    background: "#F4F4F4",
    alignSelf: "flex-start",
    borderRadius: "12px",
    boxShadow: "#dfdfdf 0px 2px 2px",
    margin: "0 0 12px 1px !important",
    position: "relative",
    minWidth: "55%",
  },
};

export default function Message({ messageData }) {
  const boxStyling =
    styling[
      messageData.sentby === auth.currentUser?.uid ? "sender" : "receiver"
    ];
  function convertTimestampToDateString({ seconds, nanoseconds }) {
    const milliseconds = seconds * 1000 + nanoseconds / 1e6;
    const date = new Date(milliseconds);
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${hours}:${minutes}`;
  }
  return (
    <Box sx={boxStyling}>
      <div>
        <Typography variant="paragraph">{messageData.letter}</Typography>
        <Box
          sx={{
            position: "absolute",
            right: "8px",
            bottom: "6px",
            opacity: 0.25,
            fontSize: "11px",
          }}
        >
          {convertTimestampToDateString(messageData.time)}
        </Box>
      </div>
    </Box>
  );
}
