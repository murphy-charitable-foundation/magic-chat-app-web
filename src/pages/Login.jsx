/* eslint-disable react-hooks/exhaustive-deps */
import {
  //Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Input,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

//import Footer from "../components/Footer";
//import GuestHeader from "../components/HeaderGuest";
import { auth } from '../firebase'
import { signInWithEmailAndPassword } from "firebase/auth";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";




const Login = () => {

  //const signInWithGoogle = () => {
    //const provider = new GoogleAuthProvider()
    //signInWithPopup(auth, provider).then(result => {
      //console.log("success")
      //navigate("/messages")
    //}).catch(e => {
      //console.error("Error: ", e)
    //})
  //}

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
 
  return (
    <> 
      <Container component="main" maxWidth="xs" sx={{mt:4,padding:0}}>
       <Box
          sx={{
            marginTop: 0,
            display: "flex",
            //flex:1,
            flexDirection: "row",
            justifyContent:'center',
            alignItems: "center",
            
          }}
       >
          
         <button style={{position:"absolute",left:15,border:'none',background:"none"}} onClick={() => navigate(-1)}> <KeyboardArrowLeftIcon /></button>
         <Typography component="h1" variant="h5" >         
            Login
         </Typography>
       </Box>

      <Box
          sx={{
            marginTop: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            
          }}
      >
          
        <CardMedia
              sx={{ width: "200px", m: "2px auto", marginTop:"15px" }}
              component="img"
              image="./logo.png"
        />

        <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 12 }}           
        >
          <Typography component="h1" variant="h6" >         
            Email
          </Typography>
            < Input
              margin="normal"
              required
              fullWidth
              type="email"
              label="Email"
              placeholder="Ex: user@gmail.com"
              name="email"
              autoComplete="email"
              autoFocus

            />
          <Typography component="h1" variant="h6" sx={{mt:6}}>         
            Password
          </Typography>
            < Input                    
              margin="normal"
              required
              fullWidth
              name="password"
              //value={password}
              label="Password"
              type="password"          
              placeholder="*******"
              id="password"
              autoComplete="current-password"
              
            />

            <Grid container item marginTop={5}>
              <Grid item xs>
                <p><Link to="reset-password">Forget your password</Link></p>
                
              </Grid>
              
            </Grid>

            <FormControlLabel
              sx={{marginTop:3,padding:0}}
              label="Remember me"
              control={<Checkbox value="remember" color="primary" />}
            />

            <Button
              type="submit"
              fullWidth             
              //variant="contained"
              sx={{
                //"&  .MuiButton-contained": {
                  //textTransform: "lowercase",
                  //mt: 3,
                  //mb: 2,
                //},
                marginTop:4,
                backgroundColor:"lightgray",
                color:"gray",
                textTransform:'lowercase'
                
              }}
            >
              Login
            </Button>
            {err && <span>Something went wrong</span>}

            </Box>
          </Box>
        
      </Container>

      
    </>
  );
};

export default Login;
