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

const configureStorageURL = (string) => (
    `https://firebasestorage.googleapis.com/v0/b/penpalmagicapp.appspot.com/o/${string}?alt=media&token=c0135b73-167c-4e33-9e67-8afea41f983c`
)

export default function MediaMessage({ messageData, key }) {
  // use auth to determine if user is a child or international buddy
  let userType = "default";
  if(messageData.sender && messageData.sender.path){
    userType = messageData.sender.path.includes("Child") ? "sender" : "receiver"
  }
  console.log(messageData)
  const boxStyling = styling[userType]
  if (messageData.content) {
    return (
      <Box sx={boxStyling} key={key} maxWidth="min(80%, 400px)" display="flex" justifyContent="center" alignItems="center">
        <img src={configureStorageURL(messageData.content)} style={{maxWidth: "80%"}} />
      </Box>
    );
  } else {
    return null;
  }
}
