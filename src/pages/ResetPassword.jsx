import React, { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {
  Typography
} from "@mui/material";
//import Stack from "@mui/material/Stack";
import {Box,Button,Container,CardMedia,Input} from "@mui/material";


import { Link, useNavigate } from "react-router-dom";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const auth=getAuth () ;
  const [showModal, setShowModal] = useState(false);

  function resetPassword() {
    const email = document.getElementById('email').value;
    sendPasswordResetEmail(auth, email).then(() => {
      setShowModal(true);
    }).catch((error) => {
      console.error(error);
    });
  }

  const Modal = ({ onClose }) => (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',
      padding: '20px',
      zIndex: 1000,
      //opacity:0
    }}>
      
      <h2>Check your email</h2>
      <p>Please check your email inbox and spam folder for a verification email to reset your password.</p>
      
      <button onClick={onClose}>Cancel</button>
      <button onClick={onClose}>Undertood</button>
           
    </div>
  );

  return (
    <div style={{textAlign:'center',paddingTop:'0px'}}>
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
            Reset your password
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

      
        <Box sx={{mt:12}}
        >
         <div style={{marginTop:"45px"}}>

           <Typography component="h1" variant="h6" >         
             Write your e-mail registered
           </Typography>
           <div style={{marginTop:"5px"}}>
             <input type="email" id="email" placeholder="Ex: user@gmail.com" style={{border:"0px",borderBottom:"1px solid black" ,padding:"10px",'width':'100%',borderRadius:"0px"}}/>
           </div>
           <button onClick={resetPassword}  style={{padding:"10px",width:"100%",marginTop:"100px",backgroundColor:'lightgrey',color:'grey',border:"none",borderRadius:"20px"}}>Reset</button>
         </div>
         </Box>

        </Box> 
      </Container>

  {showModal && (
        <div style={{position: 'absolute',zIndex: '1',paddingTop: '400px',left: '0',top: '0',width: '100%',height: '100%',overflow: 'auto',backgroundColor: 'rgb(0,0,0,0.8)'}}>
          <div style={{backgroundColor: '#fefefe',margin: 'auto',padding: '20px',border: '1px solid #888',width: '80%',boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',animationName: 'animatetop',animationDuration: '0.4s'}}>
            <h3 style={{color: '#023268'}}>Check your email</h3>
            <p>Please check your email inbox and spam folder for a verification email to reset your password.</p>
            <button onClick={() => setShowModal(false)} style={{ backgroundColor: 'lightgray', color: '#48801c', padding: '10px 20px', margin: '10px 0', borderRadius:'20px',border:0}}>Cancel</button>
            <button onClick={() => setShowModal(false)} style={{ backgroundColor: '#48801c', color: 'white', padding: '10px 20px', margin: '10px 0', borderRadius:'20px',border:0}}>Understood</button>
          </div>
        </div>
      )}
  </div>
  );

};


export default ResetPassword;
