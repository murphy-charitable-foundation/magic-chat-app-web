import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Select from "react-select";
const Profile = () => {
  console.log("Rendering Profile component");
  const [userDetails, setUserDetails] = useState({
    uniqueDocumentId: "123456789",
    photo: "./user-avatar.jpg",
    email: "user@example.com",
    firstName: "John",
    lastName: "Doe",
    bio: "Your bio goes here",
    gender: "Prefer not to say",
    country: null,
    profession: "Developer",
    favoriteAnimal: "Dog",
    hobby: "Reading",
    lastOnline: "10 minutes ago",
  });
  const [interests, setInterests] = useState([
    "Interest 1",
    "Interest 2",
    "Interest 3",
  ]);
  const [countryOptions, setCountryOptions] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((country) => ({
          value: country.name.common,
          label: (
            <div>
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                style={{ width: "24px", marginRight: "8px" }}
              />
              {country.name.common}
            </div>
          ),
        }));
        setCountryOptions(options);
      });
  }, []);
  const handleBioChange = (event) => {
    setUserDetails({ ...userDetails, bio: event.target.value });
  };
  const handleInputChange = (event, field) => {
    setUserDetails({ ...userDetails, [field]: event.target.value });
  };
  const handleCountryChange = (selectedOption) => {
    setUserDetails({ ...userDetails, country: selectedOption });
  };
  const handleInterestChange = (event, index) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = event.target.value;
    setInterests(updatedInterests);
  };
  const handleAddInterest = () => {
    setInterests([...interests, "New Interest"]);
  };
  const handleDeleteInterest = (index) => {
    setInterests(interests.filter((_, i) => i !== index));
  };
  return (
    <Box padding={2}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h5">
          Welcome back, {userDetails.firstName}!
        </Typography>
        <Avatar alt={userDetails.firstName} src={userDetails.photo} />
      </Box>
      <Divider />
      {/* User Details Section */}
      <Box mt={2}>
        <Typography variant="h6">User Details</Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          value={userDetails.email}
          onChange={(e) => handleInputChange(e, "email")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="First Name"
          variant="outlined"
          value={userDetails.firstName}
          onChange={(e) => handleInputChange(e, "firstName")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Last Name"
          variant="outlined"
          value={userDetails.lastName}
          onChange={(e) => handleInputChange(e, "lastName")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Profession"
          variant="outlined"
          value={userDetails.profession}
          onChange={(e) => handleInputChange(e, "profession")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Favorite Animal"
          variant="outlined"
          value={userDetails.favoriteAnimal}
          onChange={(e) => handleInputChange(e, "favoriteAnimal")}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Hobby"
          variant="outlined"
          value={userDetails.hobby}
          onChange={(e) => handleInputChange(e, "hobby")}
          margin="normal"
        />
        <Typography paragraph>Last Online: {userDetails.lastOnline}</Typography>
        <Select
          options={countryOptions}
          value={userDetails.country}
          onChange={handleCountryChange}
          isSearchable
          placeholder="Select a country..."
          styles={{ container: (base) => ({ ...base, marginTop: 8 }) }}
        />
      </Box>
      {/* Bio Section */}
      <Box mt={2}>
        <Typography variant="h6">Bio</Typography>
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Bio"
          variant="outlined"
          value={userDetails.bio}
          onChange={handleBioChange}
          margin="normal"
        />
      </Box>
      {/* Interests Section */}
      <Box mt={2}>
        <Typography variant="h6">Interests</Typography>
        <List>
          {interests.map((interest, index) => (
            <ListItem key={index} divider>
              <ListItemText>
                <TextField
                  fullWidth
                  label="Interest"
                  variant="outlined"
                  value={interest}
                  onChange={(e) => handleInterestChange(e, index)}
                />
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={() => handleDeleteInterest(index)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Button variant="outlined" onClick={handleAddInterest}>
          Add Interest
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
