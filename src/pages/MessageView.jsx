// import React, { useState } from 'react';
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Card,
//   CardContent,
//   Grid,
//   Avatar,
//   BottomNavigation,
//   BottomNavigationAction,
//   Badge,
//   CssBaseline
// } from '@mui/material';
// import HomeIcon from '@mui/icons-material/Home';
// import MailIcon from '@mui/icons-material/Mail';
// import DiscoverIcon from '@mui/icons-material/Explore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import { styled, useTheme } from '@mui/system';

// const MessageView = () => {
//   const theme = useTheme();
//   const [value, setValue] = useState('recents');

//   const StyledToolbar = styled(Toolbar)({
//     justifyContent: 'space-between',
//     backgroundColor: theme.palette.background.paper,
//     color: theme.palette.text.primary,
//   });

//   const AppBarTitle = styled(Typography)({
//     flex: 1,
//     fontWeight: 'bold',
//     color: theme.palette.primary.main,
//   });

//   const StyledBottomNav = styled(BottomNavigation)({
//     width: '100%',
//     position: 'fixed',
//     bottom: 0,
//     backgroundColor: theme.palette.primary.main,
//   });

//   const MessageCard = styled(Card)({
//     marginTop: theme.spacing(2),
//     padding: theme.spacing(2),
//     backgroundColor: theme.palette.background.default,
//     borderRadius: theme.shape.borderRadius,
//     boxShadow: theme.shadows[2],
//     '&:hover': {
//       boxShadow: theme.shadows[4],
//     },
//   });

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   const Message = ({ avatar, name, date, children }) => (
//     <MessageCard>
//       <CardContent>
//         <Grid container wrap="nowrap" spacing={2}>
//           <Grid item>
//             <Avatar alt={name}>{avatar}</Avatar>
//           </Grid>
//           <Grid item xs zeroMinWidth>
//             <Typography noWrap>{children}</Typography>
//             <Typography variant="body2" color="textSecondary">{name} - {date}</Typography>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </MessageCard>
//   );

//   return (
//     <>
//       <CssBaseline />
//       <AppBar position="static">
//         <StyledToolbar>
//           <AppBarTitle variant="h6">
//             Home
//           </AppBarTitle>
//           <Badge badgeContent={4} color="secondary">
//             <MailIcon />
//           </Badge>
//         </StyledToolbar>
//       </AppBar>
//       <Container>
//         <Typography variant="h5" gutterBottom component="div" style={{ marginTop: theme.spacing(2) }}>
//           Recently Received
//         </Typography>
//         {/* Example messages */}
//         <Message avatar="CP" name="Camilo Perdomo" date="Nov 24, 2023 6:18 AM">
//           Hey there, How is it going? I saw your pictures in Italy...
//         </Message>
//         <Message avatar="LP" name="Louise Perdomo" date="Nov 23, 2023 8:15 AM">
//           Can we meet this weekend? I got something important...
//         </Message>
//         {/* Add more <Message> components here */}
//       </Container>
//       <StyledBottomNav value={value} onChange={handleChange} showLabels>
//         <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
//         <BottomNavigationAction label="Letters" value="letters" icon={<MailIcon />} />
//         <BottomNavigationAction label="Discover" value="discover" icon={<DiscoverIcon />} />
//         <BottomNavigationAction label="Donation" value="favorites" icon={<FavoriteIcon />} />
//       </StyledBottomNav>
//     </>
//   );
// };

// export default MessageView;




import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Card,
  CardContent,
  Grid,
  Avatar,
  Tabs,
  Tab,
  Box,
  Badge,
  Button,
  BottomNavigation,
  BottomNavigationAction,
  CssBaseline, // Import CssBaseline here
  IconButton, // Import IconButton here
  Paper
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import DiscoverIcon from '@mui/icons-material/Explore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Chip } from '@mui/material';


export default function App() {
  const [tabValue, setTabValue] = useState(0);
  const [bottomNavValue, setBottomNavValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleBottomNavChange = (event, newValue) => {
    setBottomNavValue(newValue);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <IconButton color="inherit">
            <SearchIcon />
          </IconButton>
          <IconButton color="inherit">
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md">
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="message tabs">
          <Tab label={<Badge badgeContent={4} color="secondary">New Messages</Badge>} />
          <Tab label="Incoming Messages" />
          <Tab label="My Messages" />
        </Tabs>
        <Box sx={{ my: 2 }}>
          {/* Message Previews Section */}
          {/* Map through your messages data to create list items */}
          {/* Placeholder for message preview */}
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar>
                    {/* Avatar content */}
                  </Avatar>
                </Grid>
                <Grid item xs zeroMinWidth>
                  <Typography noWrap>{'Message preview...'}</Typography>
                  <Typography variant="body2" color="textSecondary">{'Sender name - Timestamp'}</Typography>
                </Grid>
                <Grid item>
                  <CheckCircleIcon color="success" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* More message previews */}
        </Box>
        <Typography variant="h5" gutterBottom>
          Meet Some Kids
        </Typography>
        <Button variant="outlined">Show All</Button>
        <Grid container spacing={2} sx={{ my: 2 }}>
          {/* Cards/Grid for Items */}
          {/* Map through your items data to create cards */}
          {/* Placeholder for profile card */}
          <Grid item xs={12} sm={6} md={4}>
            <Card>
              <CardContent>
                <Avatar>
                  {/* Avatar content */}
                </Avatar>
                <Typography variant="body1" component="div">
                  {'Profile Name'}
                </Typography>
                <Chip label="Math" />
                <Chip label="Zoo" />
                <Chip label="Capoeira" />
              </CardContent>
            </Card>
          </Grid>
          {/* More profile cards */}
        </Grid>
      </Container>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation value={bottomNavValue} onChange={handleBottomNavChange}>
          <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Letters" value="letters" icon={<MailIcon />} />
          <BottomNavigationAction label="Discover" value="discover" icon={<DiscoverIcon />} />
          <BottomNavigationAction label="Donation" value="donation" icon={<FavoriteIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  );
}
