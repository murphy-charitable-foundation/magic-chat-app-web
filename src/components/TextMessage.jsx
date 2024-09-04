import { Box } from "@mui/material";
import React from "react";
import { auth } from "../firebase";

const styling = {
    "sender": {
      "padding": "5px 8px 10px",
      "background": "#D2E8C2",
      "alignSelf": "flex-end",
      "borderRadius": "10%",
      "boxShadow": "#727272 0px 2px 2px",
      "margin": "0 1px 4px 0 !important"
    },
    "receiver": {
      "padding": "5px 8px 26px",
      "background": "#F4F4F4",
      "alignSelf": "flex-start",
      "borderRadius": "10%",
      "boxShadow": "#727272 0px 2px 2px",
      "margin": "0 0 4px 1px !important"
    },
    "default": {
      "padding": "5px 8px 26px",
      "background": "#F4F4F4",
      "alignSelf": "flex-start",
      "borderRadius": "10%",
      "boxShadow": "#727272 0px 2px 2px",
      "margin": "0 0 4px 1px !important"
    }
}

export default function TextMessage({ messageData, key }) {
  // use auth to determine if user is a child or international buddy
  let userType = "default";
  const userUID = auth.currentUser.uid
  if(messageData.sent_by){
    userType = messageData.sent_by.id === userUID ? "sender" : "receiver"
  }
  const boxStyling = styling[userType]
  if (messageData.content) {
    return (
      <Box sx={boxStyling} key={key}>
        <div>
          <p>{messageData.content}</p>
        </div>
      </Box>
    );
  } else {
    return null;
  }
}
