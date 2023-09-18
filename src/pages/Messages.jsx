import { Box, Typography } from "@mui/material";
import React from "react";

const Messages = () => {
  return (
    <Box>
      <Typography variant="h5">
        Your Interaction
        <Typography variant="subtitle2" ml={1} component="small">
          Get in touch with someone
        </Typography>{" "}
      </Typography>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <Typography variant="paragraph" component="p">
        ...
      </Typography>

      <p></p>
    </Box>
  );
};

export default Messages;
