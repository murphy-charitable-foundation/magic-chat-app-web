/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Footer from "../components/Footer";
import GuestHeader from "../components/HeaderGuest";

import { auth } from '../firebase'
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"





const Login = () => {

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).then(result => {
      console.log("success")
      navigate("/messages")
    }).catch(e => {
      console.error("Error: ", e)
    })
  }

  const navigate = useNavigate();
  const [isLoggedIn, setIsloggedIn] = useState(false);

  useEffect(() => {
    setIsloggedIn(JSON.parse(localStorage.getItem("isLogin")));
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e) => {
    setIsloggedIn(true);
    console.log(isLoggedIn);
    localStorage.setItem("isLogin", JSON.stringify(isLoggedIn));
    navigate("/profile");
    e.preventDefault();
  };
  return (
    <>
      <GuestHeader />
      <Container component="main" maxWidth="xs">
        <button onClick={signInWithGoogle}>Sign In With Google</button>
        <Box
          sx={{
            marginTop: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Keep me signed in"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                "&  .MuiButton-contained": {
                  textTransform: "lowercase",
                  mt: 3,
                  mb: 2,
                },
              }}
            >
              Login
            </Button>
            <Grid container item marginTop={2}>
              <Grid item xs>
                <Link to="/reset-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <hr
        style={{
          width: "75%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 10,
          boxShadow: "4px",
        }}
      />
      <Footer />
    </>
  );
};

export default Login;
