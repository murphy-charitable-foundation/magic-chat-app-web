import { Box, Typography } from "@mui/material";
import React from "react";

const ChangePassword = () => {
  return (
    <Box>
      <Typography
        variant="paragraph"
        component="p"
        sx={{ borderTop: 1, maxWidth: "45%", my: 3, py: 3 }}
      >
        Change Password
      </Typography>
    </Box>
  );
};

export default ChangePassword;
