import { Box } from "@mui/material";
import React from "react";

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
    }
}

export default function MessageComp({ messageData }) {
  const boxStyling = styling[messageData.messageType]
  return (
    <Box sx={boxStyling}>
      <div>
        {messageData.messageContent}
      </div>
    </Box>
  );
}
