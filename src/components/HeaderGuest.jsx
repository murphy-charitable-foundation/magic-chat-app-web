import {
  AppBar,
  Box,
  CardMedia,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import React from "react";

// import MenuIcon from "@mui/icons-material/Menu";
// import AccountMenu from "./AccountMenu";

const GuestHeader = () => {
  // const [isLoggedIn, setIsloggedIn] = useState(false);
  
  return (
    <Box sx={{ flexGrow: 1, width:'1280',height:'68px'}}>
      <AppBar position="static">
        
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <CardMedia
              sx={{ width: "307px", height:"34px",top:"17px",left:"50px",m: "2px auto"}}
              component="img"
              image="./Logo-propuesta 1.png"

            />
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{flexGrow: 1
           }}
          >
            
          </Typography>

          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search> */}
          {/* <Button color="inherit">Login</Button> */}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default GuestHeader;
