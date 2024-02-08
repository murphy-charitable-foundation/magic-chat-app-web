import React, { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  Message as MessageIcon,
  Search as SearchIcon,
  Cake as CakeIcon,
  LocationOn as LocationIcon,
  School as SchoolIcon,
  Palette as PaletteIcon,
  Pets as PetsIcon,
  Home as HomeIcon,
  MusicNote as MusicNoteIcon,
  AirplanemodeActive as AirplaneIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
} from '@mui/icons-material';

const Profile = () => {
  const [userDetails, setUserDetails] = useState({
    photo: 'path_to_photo.jpg',
    fullName: 'Yohann Edwards',
    birthday: '2011-11-24',
    location: 'Village, Country',
    gender: 'Male',
    educationLevel: 'Grade 6',
    isOrphan: 'No',
    livesWith: 'Parents',
    dreamJob: 'Airplane pilot',
    hobby: 'Music',
    favoriteColor: 'Blue',
    favoriteAnimal: 'Cat',
    bio: 'Your bio goes here',
  });

  // Handlers for each input change
  const handleTextFieldChange = (field) => (event) => {
    setUserDetails({ ...userDetails, [field]: event.target.value });
  };

  return (
    <Box padding={2} sx={{ maxWidth: 360, margin: 'auto' }}>
      <Box display="flex" justifyContent="center" alignItems="center">
        <Avatar alt="User" src={userDetails.photo} sx={{ width: 100, height: 100 }} />
      </Box>
      <Box display="flex" justifyContent="space-between" my={2}>
        <Button startIcon={<MessageIcon />}>Message</Button>
        <Button startIcon={<SearchIcon />}>Search</Button>
      </Box>
      <Divider />
      <List>
        {/* Personal Information */}
        <ListItem>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Full name"
            value={userDetails.fullName}
            onChange={handleTextFieldChange('fullName')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><CakeIcon /></ListItemIcon>
          <TextField
            fullWidth
            type="date"
            label="Birthday"
            value={userDetails.birthday}
            onChange={handleTextFieldChange('birthday')}
            InputLabelProps={{ shrink: true }}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><LocationIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Location"
            value={userDetails.location}
            onChange={handleTextFieldChange('location')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><SchoolIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Education Level"
            value={userDetails.educationLevel}
            onChange={handleTextFieldChange('educationLevel')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><HomeIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Lives With"
            value={userDetails.livesWith}
            onChange={handleTextFieldChange('livesWith')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><ChildCareIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Is Orphan"
            value={userDetails.isOrphan}
            onChange={handleTextFieldChange('isOrphan')}
          />
        </ListItem>
        {/* Interests */}
        <ListItem>
        <ListItemIcon><AirplaneIcon /></ListItemIcon>
        <TextField
          fullWidth
          label="Dream Job"
          value={userDetails.dreamJob}
          onChange={handleTextFieldChange('dreamJob')}
        />
        </ListItem>
        <ListItem>
          <ListItemIcon><MusicNoteIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Hobby"
            value={userDetails.hobby}
            onChange={handleTextFieldChange('hobby')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><PaletteIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Favorite Color"
            value={userDetails.favoriteColor}
            onChange={handleTextFieldChange('favoriteColor')}
          />
        </ListItem>
        <ListItem>
          <ListItemIcon><PetsIcon /></ListItemIcon>
          <TextField
            fullWidth
            label="Favorite Animal"
            value={userDetails.favoriteAnimal}
            onChange={handleTextFieldChange('favoriteAnimal')}
          />
        </ListItem>
        {/* Bio */}
        <ListItem>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Bio"
            value={userDetails.bio}
            onChange={handleTextFieldChange('bio')}
          />
        </ListItem>
      </List>
    </Box>
  );
};

export default Profile;
