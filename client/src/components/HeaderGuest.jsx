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
    <Box sx={{ flexGrow: 1 }}>
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
              sx={{ width: "100px", m: "2px auto" }}
              component="img"
              image="./logo.png"
            />
            {/* <MenuIcon /> */}
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            PEN PAL - Murphy Foundation
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
