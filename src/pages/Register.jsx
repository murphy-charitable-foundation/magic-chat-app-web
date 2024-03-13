import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  CardMedia,
  FormControlLabel,
  Grid,
  TextField,
  Input,
  Typography,
} from "@mui/material";
import React, {useEffect,useState} from "react";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

import { Link, useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestore, storage } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    
    const firstName = e.target[0].value;
    const lastName = e.target[1].value;
    const email = e.target[2].value;
    const birthday = e.target[3].value;
    const password = e.target[4].value;
    const repeatPassword= e.target[5].value;

    if(password !==repeatPassword){
      alert("Passwords do not match.");
      return;
    }

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      //const date = new Date().getTime();
      //const storageRef = ref(storage, `${displayName + date}`);

     // await uploadBytesResumable(storageRef, file).then(() => {
        //getDownloadURL(storageRef).then(async (downloadURL) => {
          try {
            //Update profile
            await updateProfile(res.user, {
              firstName,
              lastName,
              birthday,
              //photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(firestore, "users", res.user.uid), {
              uid: res.user.uid,
              firstName,
              lastName,
              email,
              birthday,
              //photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(firestore, "userChats", res.user.uid), {});
            navigate("/profile");
          } catch (err) {
            console.log(err);
            setErr(true);
            setLoading(false);
          }
   // });
  //});
    } catch (err) {
      console.err("Error creating account:", err);
      alert(err.message);
      //setErr(true);
      //setLoading(false);
    }
  //};

  //const [err, setErr] = useState(false);
  //const handleSubmit = (event) => {
    //event.preventDefault();
    //const data = new FormData(event.currentTarget);
    //console.log({
      //email: data.get("email"),
      //password: data.get("password"),

    //});
  };

  return (
    <>
     <Container component="main" maxWidth="xs" sx={{mt:4,padding:2}}>
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
            Create account
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


        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 10 }}>
          <Box
            sx={{
              marginTop: 0,
              display: "flex",
                      //flex:1,
              flexDirection: "row",
              gap:8
              //justifyContent:'center',
              //alignItems: "center",
                      
            }}
          >
            <Box
            sx={{
              flexDirection:"column",
            }}
            >
              <Typography component="h1" variant="h6" >         
               First name
              </Typography>
              <Input
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                placeholder="Ex: Jane"
                autoFocus
              />

            </Box>

           <Box
           sx={{
            flexDirection:"column"
           }}
           >
             <Typography component="h1" variant="h6" >         
              Last name
             </Typography>
              <Input
                required
                fullWidth
                id="lastName"
                label="Last Name"
                placeholder="Ex: Doe"
                name="lastName"
                //autoComplete="family-name"
              />

           </Box>

          </Box>
         
           <Typography component="h1" variant="h6" >         
            Email
          </Typography>
              <Input
                required
                fullWidth
                id="email"
                label="Email Address"
                placeholder="Ex: my-email@gmail.com"
                name="email"
                autoComplete="email"
              />
            

          <Typography component="h1" variant="h6" >         
            Birthday
          </Typography>
              <Input
                required
                fullWidth
                id="birthday"
                label="Birthday"
                placeholder="DD/MM/YYYY"
                name="birthday"
                //autoComplete="birthday"
              />
            
          <Typography component="h1" variant="h6" >         
            Create a password
          </Typography>
            
              <Input
                required
                fullWidth
                name="password"
                label="Create a password"
                type="password"
                placeholder="*******"
                id="password"
                autoComplete="new-password"
              />
            
          <Typography component="h1" variant="h6" >         
            Repeat password
          </Typography>
           
              <Input
                required
                fullWidth
                name="repeatPassword"
                label="Repeat a password"
                type="repeatPassword"
                placeholder="*******"
                id="repeatPassword"
                autoComplete="new-password"
              />
            
            <Grid item xs={12}>
              <Grid item xs>
                <p>See the <Link to="terms-conditions">terms and conditions</Link> and <Link to="privacy-policy">privacy policy</Link></p>
              </Grid>
            </Grid>
          
          <Button
            type="submit"
            fullWidth
            //variant="contained"
            sx={{ //mt: 3, mb: 2, 
              //padding: '10px 20 px',
              //width:'80%',
              marginTop:4,
              backgroundColor:"lightgray",
              color:"gray",
              
              //textTransform:'lowercase',
              borderRadius:"20px",
              cursor:'pointer'}}
          >
            Accept and Continue
          </Button>
          

        </Box>
      </Box>
    
    </Container>
    </>
  );
};

export default Register;
