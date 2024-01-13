import { Avatar, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";

import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  getDocs,
  addDoc,
  doc,
  serverTimestamp,
  updateDoc,
  where
} from "firebase/firestore";

function Message() {
  const [message, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [childId, setChildId] = useState(null);
  const [internationalBuddyRef, setInternationalBuddyRef] = useState(null);
  const [childRef, setChildRef] = useState(null)
  const [messageDocRef, setMessageDocRef] = useState(null)

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return unsubscribe;
  });


  useEffect(() => {
    const fetchData = async () => {
      console.log("new page")
      try {
        const collectionRef = collection(firestore, "Child");
        // get users email from =====>>>>> user.email
        const q = query(collectionRef, where("email", '==', 'penpalprogram.murphycharity@gmail.com'))
        const docRef = await getDocs(q)
        console.log(docRef);
        if (!docRef.empty) {
          setChildId(docRef.docs[0].id)
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("new id", childId)
    let isMounted = true;

    if (!childId) return
    const fetchData = async () => {
      try {
        const collectionRef = collection(firestore, "Chat");
        const chatBuddy = window.location.pathname.split("/messages/")[1];
        const intlBuddyRef = doc(collection(firestore, 'InternationalBuddy'), chatBuddy);
        const childReference = doc(collection(firestore, 'Child'), childId);
        setInternationalBuddyRef(intlBuddyRef);
        setChildRef(childReference);

        const q = query(
          collectionRef,
          where("child", '==', childReference),
          where("international_buddy", '==', intlBuddyRef)
        );

        const docSnapshot = await getDocs(q);

        if (isMounted) {
          setMessageDocRef(docSnapshot);

          if (!docSnapshot.empty) {
            setMessage(docSnapshot.docs[0].data().Messages);
          }
        }
      } catch (e) {
        console.error('Error fetching chat:', e);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [childId]);

const sendMessage = async (e) => {
  e.preventDefault();

  if (!newMessage.trim()) return;

  const newMessagePayload = {
    deleted_at: null,
    content: newMessage.trim(),
    moderated_at: null,
    content_type: "text",
    sender: childRef,
  };

  const updatedMessages = [...message, newMessagePayload];

  await updateDoc(messageDocRef.docs[0].ref, { Messages: updatedMessages });

  setMessage(updatedMessages);

  setNewMessage("");
};
return (
  <Box>
    <Stack direction="row" sx={{ alignItems: "center" }}>
    </Stack>
    <Typography variant="paragragh" paddingX={2} marginX={2}>
      <hr />
    </Typography>
    <div>
      {user ? (
        <div>
          <MessagesComp chat={message} />
          <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} />
        </div>
      ) : (
        <div>not logged in</div>
      )}
    </div>
  </Box>
);
}

export default Message;
