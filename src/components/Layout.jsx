import React from "react";
import { Outlet } from "react-router";
import { Container, Paper } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Container sx={{ maxWidth: "90%", marginTop: 3 }}>
        <Paper sx={{ minHeight: 300, padding: 3 }}>
          <Outlet />
        </Paper>
      </Container>

    </>
  );
};

export default Layout;
