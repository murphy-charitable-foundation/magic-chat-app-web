/* eslint-disable react-hooks/exhaustive-deps */
import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";

import Login from "./Login";
import Profile from "./Profile";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsloggedIn] = useState(false);
  useEffect(() => {
    setIsloggedIn(JSON.parse(localStorage.getItem("isLogin")));

    if (isLoggedIn) {
      // navigate("/login");
    } else {
      navigate("/login");
    }
  }, [isLoggedIn]);

  return (
    <Container sx={{ marginY: 3, marginX: 3 }}>
      {isLoggedIn ? <Profile /> : <Login />}
    </Container>
  );
};

export default Home;
