import { Box, Typography } from "@mui/material";
import React from "react";

const Donate = () => {
  return (
    <Box>
      <Typography variant="h5">
        Donate to the Foundation{" "}
        <Typography variant="subtitle2" ml={1} component="small">
          Make a difference
        </Typography>{" "}
      </Typography>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <Typography variant="paragraph" component="p">
        You may donate to the general course or toward a project.
      </Typography>

      <p>Choose an option below:</p>
    </Box>
  );
};

export default Donate;
