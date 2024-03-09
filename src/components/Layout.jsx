import React from "react";

import { Outlet } from "react-router";

import { Container, Box } from "@mui/material";

const Layout = () => {
  return (
    <>
      
      <Container sx={{ maxWidth: "100%", marginTop: 3 }}>
        <Box sx={{ minHeight: 300, padding: 3 }}>
          <Outlet />
        </Box>
      </Container>

    
    </>
  );
};

export default Layout;
