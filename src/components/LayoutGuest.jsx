import React from "react";

import { Outlet } from "react-router";

import { Container, Box } from "@mui/material";

const LayoutGuest = () => {
  return (
    <>
     
      <Container sx={{ maxWidth: "100%", marginTop: 0 }}>
        <Box sx={{ minHeight: 300, padding: 0 }}>
          <Outlet />
        </Box>
      </Container>
     
    </>
  );
};

export default LayoutGuest;
