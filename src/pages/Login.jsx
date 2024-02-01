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
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
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
      <Container component="main" width='1280px' height='650px' marginTop='0px' marginLeft='0px'>
      <Box
        sx={{marginTop:'0px',
        marginLeft:'0px', 
        display:"flex" ,
        flexDirection:"row" ,
        alignItems:"left",
      }}
      >      
        <Box
          sx={{
            marginTop: '149px',
            marginLeft:'150px',
            display: "flex",
            flexDirection: "column",
            alignItems: "left",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "green" }}>
            <AccountCircleIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1, width:'329px',height:'56px',top:'221px',left:'150px'}}
          >
         
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email address"
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

            <Grid container item marginTop={2}>
              <Grid item xs>
                <Link to="/reset-password" variant="body2">
                  Forgot your password?
                </Link>
              </Grid>
            </Grid>

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
              ENTER
            </Button>
          </Box>
        </Box>

        <Box
          sx={{
            marginTop: 0,
            marginLeft:'240px',

          }}

        >
         <div className="App"> 
            <img src="./images/mask.png" alt="mask"  height={650} width={630}/> 
         </div>

        </Box>
      </Box>

      </Container>
      <hr
        style={{
          width: "80%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 30,
          boxShadow: "6px",
        }}
      />
      <Footer />
    </>
  );
};

export default Login;
