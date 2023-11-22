import React from "react";
import Header from "./Header";
import { Outlet } from "react-router";
import Footer from "./Footer";
import { Container } from "@mui/material";

const Layout = () => {
  return (
    <>
      <Header />
      <Container sx={{ maxWidth: 800, marginTop: 3, padding: 0 }}>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
