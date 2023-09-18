import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <Box>
      <Stack direction="row">
        <Box width="90%">
          <Typography variant="h5" component="h5">
            Welcome back, Festus!
          </Typography>
        </Box>
        <Box sx={{ alignContent: "end" }}>
          <Avatar
            alt="Remy Sharp"
            sx={{ alignContent: "end" }}
            src="./images/festus.jpg"
          />
        </Box>
      </Stack>

      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <Typography variant="paragraph" component="p"></Typography>
    </Box>
  );
};

export default Profile;
