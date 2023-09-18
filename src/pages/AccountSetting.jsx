import { Box, Typography } from "@mui/material";
import React from "react";
import ChangePassword from "./ChangePassword";

const AccountSetting = () => {
  return (
    <Box>
      <Typography variant="h5" component="h5">
        Account Settings
      </Typography>
      <Typography variant="paragraph" component="p"></Typography>
      <ChangePassword />
    </Box>
  );
};

export default AccountSetting;
