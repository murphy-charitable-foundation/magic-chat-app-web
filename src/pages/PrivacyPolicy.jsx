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
  //import { signInWithEmailAndPassword } from "firebase/auth";
  
  //import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  
  
  
  
  const PrivacyPolicy = () => {
    const navigate = useNavigate();

    
    return (
      <> 
        <Container component="main" maxWidth="xs" sx={{mt:2,padding:2}}>
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
              Privacy policy
           </Typography>
         </Box>
  
        <Box
            sx={{
              marginTop: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              
            }}
        >
            
          <CardMedia
                sx={{ width: "200px", m: "2px auto", marginTop:"0px" }}
                component="img"
                image="./logo.png"
          />
  
          <Box

              sx={{ mt: 1 }}           
          >
            <Typography component="h1" variant="h6" > 
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 

            </Typography>
             
  
              </Box>
            </Box>
          
        </Container>
         
      </>
    );
  };
  
  export default PrivacyPolicy;