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
  const [childId, setChildId] = useState("");
  const [connectedChatsObjects, setConnectedChatsObjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userDocRef = doc(collection(firestore, "users"), auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          const connectedChatsRef = userData?.connected_penpals || [];

          const connectedChatIds = connectedChatsRef.map(chat => chat.id);

          const letterboxQuery = query(collection(firestore, "letterbox"), where("members", "array-contains", "/users/" + auth.currentUser.uid));
          const letterboxQuerySnapshot = await getDocs(letterboxQuery);

          const messages = [];

          for (const doc of letterboxQuerySnapshot.docs) {
            const letterboxData = doc.data();
            const lettersCollectionRef = collection(doc.ref, "letters");
            const lettersQuerySnapshot = await getDocs(lettersCollectionRef);

            lettersQuerySnapshot.forEach((letterDoc) => {
              const letter = letterDoc.data();
              messages.push({
                collectionId: letterDoc.id,
                // filter rather than find - to allow group chats
                receiver: letterboxData.members.filter(member => !member.includes(auth.currentUser.uid)),
                content: letter.content,
                deleted: letter.deleted_at,
                moderation: letter.moderation
              });
            });
          }
          console.log(messages)

          setConnectedChatsObjects(messages);
          setChildId(userDocSnapshot.id);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box>
      <Stack sx={{ marginBottom: "16px" }}>
        <Typography variant="h1">Chats</Typography>
      </Stack>
      <MessageBoard messages={connectedChatsObjects} />
      {/* {connectedChatsObjects.map(c => (
        <div>{c.id}</div>
      ))} */}
    </Box>
  );
};

export default Messages;
