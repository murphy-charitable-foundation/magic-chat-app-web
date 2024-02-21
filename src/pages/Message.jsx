import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import MessagesComp from "../components/MessagesComp";
import NewMessage from "../components/NewMessage";
import { firestore, auth } from "../firebase";
import {
  collection,
  query,
  getDocs,
  doc,
  where,
  getDoc,
  addDoc
} from "firebase/firestore";
import ImageThumbnail from "../components/ImageThumbnail";

function Messages() {
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null)
  const [messageDocRef, setMessageDocRef] = useState(null)
  const [userSet, setUserSet] = useState(false)
  useEffect(() => {
    console.log("finding user")
    findUser()
  }, [userSet]);

  const findUser = async () => {
    const user = await new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        resolve(user);
        unsubscribe();
      }, reject);
    });

    if (!user) {
      console.log("User not found");
      return;
    }

    const userDocRef = doc(firestore, "users", user.uid);
    setUser(userDocRef)
    // setChildRef(userDocRef);
    setUserSet(true);
  };

  useEffect(() => {
    getSubData()
  }, []);

  const collectionName = "letterbox"; // Replace "letterbox" with the actual collection name
  const splitUrl = window.location.href.split("/")
  const letterboxId = splitUrl[splitUrl.length - 1]
  // const letterboxId = splitUrl[splitUrl.length - 1]; // Replace "letterboxIdFromParams" with the actual document ID from URL parameters

  const getSubData = async () => {
    try {
      const collectionRef = collection(firestore, collectionName);
      const querySnapshot = await getDocs(query(collectionRef, where("letterboxId", "==", letterboxId)));

      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const documentSnapshot = await getDoc(documentRe);

      const subcollectionRe = collection(documentRe, "letters");
      const subcollectionSnapshott = await getDocs(subcollectionRe);

      if (subcollectionSnapshott.empty) {
        setMessageDocRef(documentRe)
        return [];
      }

      const msgs = [];
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push({
          collectionId: subDoc.id,
          sentby: letter.sentby,
          content: letter.content,
          content_type: letter.content_type,
          deleted: letter.deleted_at,
          moderation: letter.moderation
        });
      });

      setMessage(msgs)
      setMessageDocRef(documentRe)

      return messages;
    } catch (error) {
      console.error("Error fetching subcollection data:", error);
      return [];
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if(imagePreviewUrl){
      nowSendImage()
    }
    if (!newMessage.trim()) return;
    if (!userSet) {
      await findUser()
    }

    try {
      const newMessagePayload = {
        deleted_at: null,
        content: newMessage.trim(),
        moderated_at: null,
        content_type: "text",
        sentby: user,
      };
      const updatedMessages = [...messages, newMessagePayload];
      const subcollectionRef = collection(messageDocRef, "letters");

      await addDoc(subcollectionRef, newMessagePayload);

      console.log("Updated messages:", updatedMessages);

      if (!messageDocRef) {
        throw new Error("Message document reference not found.");
      }

      await getSubData()
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const sendImageMessage = async (url) => {
    setImagePreviewUrl(url)
    if (!userSet) {
     await findUser()
    }
  }
  const nowSendImage = async () => {
    try {
      const newMessagePayload = {
        deleted_at: null,
        content: imagePreviewUrl,
        moderated_at: null,
        content_type: "media",
        sentby: user,
      };
      const updatedMessages = [...messages, newMessagePayload];
      const subcollectionRef = collection(messageDocRef, "letters");

      await addDoc(subcollectionRef, newMessagePayload);

      console.log("Updated messages:", updatedMessages);

      if (!messageDocRef) {
        throw new Error("Message document reference not found.");
      }

      await getSubData()
      setImagePreviewUrl(null);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }
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
            <MessagesComp chat={messages} />
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} onUploadComplete={sendImageMessage} />
            <ImageThumbnail url={imagePreviewUrl} />
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Messages;
