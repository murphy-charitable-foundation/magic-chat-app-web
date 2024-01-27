import {
  Box,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MessageBoard from "../components/MessageBoard";

import { auth, firestore } from "../firebase";
import {
  collection,
  query,
  getDocs,
  where,
  doc,
  getDoc
} from "firebase/firestore";

const Messages = () => {
  const [connectedChats, setConnectedChats] = useState([]);
  const [childId, setChildId] = useState("");
  const [connectedChatsObjects, setConnectedChatsObjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(collection(firestore, "users"), auth.currentUser.uid);
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const connectedChatsRef = docSnapshot.data();
          setChildId(docSnapshot.id);

          connectedChatsRef?.connected_penpals.forEach((chat) => {
            setConnectedChats([chat]);
          });
        }
        console.log("chats", connectedChats)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const letterboxQuery = query(collection(firestore, "letterbox"), where("members", "array-contains", auth.currentUser.uid));
        console.log(auth.currentUser.uid)
        const querySnapshot = await getDocs(letterboxQuery);
        console.log(querySnapshot)
        const letterboxes = [];
        querySnapshot.forEach((doc) => {
          const letterboxData = doc.data();
          letterboxes.push({
            id: doc.id,
            data: letterboxData,
          });
        });
        console.log(letterboxes)


        // const collectionRef = collection(firestore, "letterbox")
        // // member needs to be a reference to the user itself not just a string
        // const memberId = '/users/c1WEgNP6oGNAPQr51cX8SeS5tln1'
        // const q = query(collectionRef, where("members", "array-contains", memberId));
        // const querySnapshot = await getDocs(q);

        // if (!querySnapshot.empty) {
        //   querySnapshot.forEach(async (doc) => {
        //     const letterboxDoc = doc.data();
        //     const letterboxId = doc.id;
        //     const lettersCollectionRef = collection(doc.ref, "letters");
        //     const lettersQuerySnapshot = await getDocs(lettersCollectionRef);

        //     if (!lettersQuerySnapshot.empty) {
        //       const messages = [];
        //       lettersQuerySnapshot.forEach((letterDoc) => {
        //         messages.push(letterDoc.data());
        //       });
        //       console.log("letterbox:", letterboxDoc);
        //       console.log("letterboxId:", letterboxId);
        //       console.log("Messages:", messages);
        //     }
        //   });
        // }


      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    };
    fetchChats()
  }, [childId]);

  return (
    <Box>
      <Stack sx={{ marginBottom: "16px" }}>
        <Typography variant="h1">Chats</Typography>
      </Stack>
      <MessageBoard messages={connectedChatsObjects} />
      {connectedChats.map(id => (
        <div>{id}</div>
      ))}
    </Box>
  );
};

export default Messages;
