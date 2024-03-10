import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";

// import { auth, firestore } from "../firebase";
// import {
//   collection,
//   query,
//   getDocs,
//   where,
//   doc,
//   getDoc,
//   orderBy,
//   limit
// } from "firebase/firestore";
import { fetchData } from "../utils/firestore";

const Messages = () => {
  const [connectedChatsObjects, setConnectedChatsObjects] = useState([]);
  const gatherData = async () => {
    await fetchData(setConnectedChatsObjects);
    // console.log('messagessss', messages)
    // setConnectedChatsObjects(messages)
  }
  useEffect(() => {
    gatherData()
  }, []);

  return (
    <Box>
      <Stack sx={{ marginBottom: "16px" }}>
        <Typography variant="h1">Chats</Typography>
      </Stack>
      <MessageBoard messages={connectedChatsObjects} />
    </Box>
  );
};

export default Messages;
