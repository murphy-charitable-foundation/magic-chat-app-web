import { Box, Typography } from "@mui/material";
import React from "react";

const About = () => {
  return (
    <Box>
      <Typography variant="h5">About PEN PAL </Typography>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <Typography variant="paragraph" component="p">
        This app is designed to ....
      </Typography>

      <p>
        It allows the buddy and the kids to enjoy private and moderated
        conversation
      </p>
    </Box>
  );
};

export default About;
