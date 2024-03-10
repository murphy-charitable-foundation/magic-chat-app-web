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
  getDoc,
  orderBy,
  limit
} from "firebase/firestore";

const Messages = () => {
  const [connectedChatsObjects, setConnectedChatsObjects] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        if (!auth.currentUser?.uid) {
          console.warn("error loading auth")
          setTimeout(() => {
            fetchData()
          }, 2000)
          return
        }
        const userDocRef = doc(collection(firestore, "users"), auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const letterboxQuery = query(collection(firestore, "letterbox"), where("members", "array-contains", userDocRef));
          const letterboxQuerySnapshot = await getDocs(letterboxQuery);

          const messages = [];

          for (const doc of letterboxQuerySnapshot.docs) {
            const letterboxData = doc.data();
            const lettersCollectionRef = collection(doc.ref, "letters");
            const lettersQuerySnapshot = await getDocs(
              query(lettersCollectionRef,
                where("status", "==", 'sent'),
                where("deleted_at", "==", null),
                orderBy("created_at", "desc"),
                limit(10)
              )
            )
            const queryDocumentSnapshots = lettersQuerySnapshot.docs
            const latestMessage = queryDocumentSnapshots[0].data()
            console.log(latestMessage)
            messages.push({
              letterboxId: doc.id,
              collectionId: queryDocumentSnapshots[0].id,
              // filter rather than find - to allow group chats
              receiver: letterboxData.members.filter(memberRef => memberRef.id !== auth.currentUser.uid).id,
              content: latestMessage.letter,
              deleted: latestMessage.deleted_at,
              moderation: latestMessage.moderation
            });
          }
          console.log(messages)

          setConnectedChatsObjects(messages);
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
    </Box>
  );
};

export default Messages;
