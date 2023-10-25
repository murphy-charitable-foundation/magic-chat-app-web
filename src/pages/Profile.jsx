import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Stack,
  Typography,
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
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [isEditingInterests, setIsEditingInterests] = useState(false);
  const [bio, setBio] = useState("Your bio goes here");
  const [interests, setInterests] = useState([
    "Interest 1",
    "Interest 2",
    "Interest 3",
  ]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [countryOptions, setCountryOptions] = useState([]);

  // Fetch list of countries and their flags
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

  const handleEditBioClick = () => {
    setIsEditingBio(true);
  };

  const handleSaveBioClick = () => {
    setIsEditingBio(false);
  };

  const handleEditInterestsClick = () => {
    setIsEditingInterests(true);
  };

  const handleSaveInterestsClick = () => {
    setIsEditingInterests(false);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleInterestChange = (event, index) => {
    const updatedInterests = [...interests];
    updatedInterests[index] = event.target.value;
    setInterests(updatedInterests);
  };

  const handleAddInterest = () => {
    const newInterest = "New Interest";
    setInterests([...interests, newInterest]);
  };

  const handleDeleteInterest = (index) => {
    const updatedInterests = [...interests];
    updatedInterests.splice(index, 1);
    setInterests(updatedInterests);
  };

  return (
    <Box>
      <Stack direction="row" alignItems="center">
        <Box flex="1">
          <Typography variant="h5" component="h5">
            Welcome back, Festus!
          </Typography>
        </Box>
        <Box>
          <Avatar alt="Festus" src="./images/festus.jpg" />
        </Box>
      </Stack>

      <Typography variant="paragraph" paddingX={2} marginX={2}>
        <hr />
      </Typography>

      <Box padding={2}>
        {isEditingBio ? (
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6">Edit Bio</Typography>
              <TextField
                fullWidth
                multiline
                rows={3}
                label="Bio"
                variant="outlined"
                value={bio}
                onChange={handleBioChange}
              />
              <Box marginTop={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveBioClick}
                >
                  Save Bio
                </Button>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Box>
            <Typography variant="h6">Bio</Typography>
            <Typography variant="paragraph" component="p">
              {bio}
            </Typography>
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditBioClick}
              >
                Edit Bio
              </Button>
            </Box>
          </Box>
        )}

        {isEditingInterests ? (
          <Paper elevation={3}>
            <Box padding={2}>
              <Typography variant="h6">Edit Interests</Typography>
              <List>
                {interests.map((interest, index) => (
                  <div key={index}>
                    <ListItem>
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
                          aria-label="delete"
                          onClick={() => handleDeleteInterest(index)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                    {index < interests.length - 1 && <Divider />}
                  </div>
                ))}
              </List>
              <Box marginTop={2}>
                <Button
                  variant="outlined"
                  onClick={handleAddInterest}
                >
                  Add Interest
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveInterestsClick}
                  style={{ marginLeft: "10px" }}
                >
                  Save Interests
                </Button>
              </Box>
            </Box>
          </Paper>
        ) : (
          <Box>
            <Typography variant="h6">Interests</Typography>
            <List>
              {interests.map((interest, index) => (
                <div key={index}>
                  <ListItem>
                    <ListItemText primary={interest} />
                  </ListItem>
                  {index < interests.length - 1 && <Divider />}
                </div>
              ))}
            </List>
            <Box marginTop={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditInterestsClick}
              >
                Edit Interests
              </Button>
            </Box>
          </Box>
        )}
      </Box>

      <Box padding={2}>
        <Typography variant="h6">Country</Typography>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={(selectedOption) => setSelectedCountry(selectedOption)}
          isSearchable
          placeholder="Select a country..."
        />
      </Box>
    </Box>
  );
};

export default Profile;

