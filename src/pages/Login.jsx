/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Input,
  //TextField,
  Typography,
} from "@mui/material";
//import './ResetPassword.css'
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom/dist";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

import Footer from "../components/Footer";
import GuestHeader from "../components/HeaderGuest";

import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
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
  const [err, setErr] = useState(false);
  //const [isLoggedIn, setIsloggedIn] = useState(false);

  //useEffect(() => {
    //setIsloggedIn(JSON.parse(localStorage.getItem("isLogin")));
  //}, [isLoggedIn]);

  //useEffect(() => {
    //if (isLoggedIn) {
      //navigate("/profile");
    //}
  //}, [isLoggedIn]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const email= e.target[0].value;
    const password = e.target[1].value;

    try{
      await signInWithEmailAndPassword(auth,email,password);
      navigate("/profile")
    } catch (err) {
      setErr(true);
    }

  };

  const [email,setEmail]=useState('')
  const auth=getAuth();

  const triggerResetEmail = async() =>{
    await sendPasswordResetEmail(auth,email);
    console.log("Password reset email sent")
  };



  return (
    <>
      <GuestHeader />
      <Container component="main" maxWidth="xs" >
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
            < Input
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email"
              //placeholder="email"
              //name="email"
              autoComplete="email"
              autoFocus
            />

            < Input                    
              margin="normal"
              required
              fullWidth
              //name="password"
              //value={password}
              label="Password"
              type="password"          
              //placeholder="password"
              //id="password"
              autoComplete="current-password"
            />

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
            {err && <span>Something went wrong</span>}
            <Grid container item marginTop={2}>
              <Grid item xs>
                <button onClick={triggerResetEmail}>Fogot password?</button>
              </Grid>
              {<Grid>
                <Link to="/SignUp" variant="body2">
                  {"Don't have an account? SignUp"}
                </Link>
              </Grid> }
            </Grid>
          </Box>
        </Box>
      </Container>
      <hr
        style={{
          width: "75%",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 40,
          boxShadow: "4px",
        }}
      />
      <Footer />
    </>
  );
};

export default Login;
