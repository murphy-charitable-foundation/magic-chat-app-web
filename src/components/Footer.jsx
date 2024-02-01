import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CallIcon from "@mui/icons-material/Call";
import Donate from "../pages/Donate.jsx";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Footer = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const title = "Murphy Charitable Foundation";

  return (
    <Box
     sx={{//marginTop:'0px',
     marginLeft:'0px', 
     display:"flex" ,
     flexDirection:"row" ,
     alignItems:"left",
     maxWidth: '1280px', 
     //marginX: "auto", 
     marginTop: 1 
     }}
    >    
     <Box
      sx={{ maxWidth: '1000px', 
      //marginX: "auto", 
      marginLeft:'300px',
      marginTop: 2,

    }}
      alignContent="left"
     >
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
          if (newValue === 0) {
            navigate("/donate");
          } else if (newValue === 1) {
            navigate("/contact");
          } else if (newValue === 2) {
            navigate("/about");
          }
          //  console.log(newValue);
        }}
      >
        <BottomNavigationAction
          label="Donate"
          LinkComponent={Donate}
          icon={<AttachMoneyIcon />}
        />
        <BottomNavigationAction label="Contact" icon={<CallIcon />} />
        <BottomNavigationAction label="About" icon={<QuestionMarkIcon />} />
      </BottomNavigation>


     </Box>
     <Box textAlign="right" marginLeft='450px'>
        <Typography marginTop={4}>
          &copy; {new Date().getFullYear()} - {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
