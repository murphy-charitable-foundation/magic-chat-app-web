import { Box, Button, Stack, Typography } from "@mui/material";
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
  addDoc,
  orderBy,
  limit,
  startAfter
} from "firebase/firestore";
import ImageThumbnail from "../components/ImageThumbnail";

const PAGE_SIZE = 10;

function Messages() {
  const [messages, setMessage] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState([])
  const [messageDocRef, setMessageDocRef] = useState(null)
  const [userSet, setUserSet] = useState(false)
  const [lastMessageDoc, setLastMessageDoc] = useState(null);

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
    setUserSet(true);
  };

  useEffect(() => {
    getSubData()
  }, []);

  const collectionName = "letterbox";
  const splitUrl = window.location.href.split("/")
  const letterboxId = splitUrl[splitUrl.length - 1]

  const getSubData = async () => {
    try {
      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const subcollectionRe = collection(documentRe, "letters");
      console.log("collecting messages")
      const q = query(subcollectionRe, orderBy("created_at", "desc"), limit(PAGE_SIZE));
      const subcollectionSnapshott = await getDocs(q);
      console.log(subcollectionSnapshott)
      if (subcollectionSnapshott.empty) {
        setMessageDocRef(documentRe)
        return [];
      }

      const msgs = [];
      // REZ - this used to break but shouldn't anymore
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push({
          collectionId: subDoc.id,
          attachments: letter.attachments,
          letter: letter.letter,
          sent_by: letter.sent_by,
          created_at: letter.created_at,
          deleted_at: letter.deleted_at,
          moderation: letter.moderation,
        });
        setLastMessageDoc(subDoc); // Update last document for pagination
      });
      setMessage(msgs)
      setMessageDocRef(documentRe)

      return msgs;
    } catch (error) {
      console.error("Error fetching subcollection data:", error);
      return [];
    }
  };

  const fetchNextMessage = async () => {
    try {
      if (!lastMessageDoc) return;

      const subcollectionRe = collection(messageDocRef, "letters");
      const q = query(subcollectionRe,
        where("deleted_at", "==", null),
        where("moderation.approved", "==", true),
        orderBy("deleted_at"),
        orderBy("moderation.approved"),
        orderBy("created_at", "desc"),
        startAfter(lastMessageDoc),
        limit(PAGE_SIZE)
      );
      const subcollectionSnapshott = await getDocs(q);


      if (subcollectionSnapshott.empty) {
        console.log("No more messages available.");
        return;
      }

      const newMessage = subcollectionSnapshott.docs[0].data();
      setMessage(prevMessages => [...prevMessages, newMessage]);
      setLastMessageDoc(subcollectionSnapshott.docs[0]); // Update last document for next pagination
    } catch (error) {
      console.error("Error fetching next message:", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    if (!userSet) await findUser()

    try {
      const newMessagePayload = {
        deleted_at: null,
        letter: newMessage,
        created_at: new Date(),
        moderation: {
          approved: false,
          comment: "",
          moderated_at: null
        },
        sent_by: user,
        attachments: imagePreviewUrl
      };
      const updatedMessages = [...messages, newMessagePayload];
      const subcollectionRef = collection(messageDocRef, "letters");
      // REZ - this will break if permissions set
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
    setImagePreviewUrl([url, ...imagePreviewUrl])
    if (!userSet) {
      await findUser()
    }
  }
  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Button onClick={fetchNextMessage}>Fetch Next Message</Button>
      </Stack>
      <Typography variant="paragragh" paddingX={2} marginX={2}>
        <hr />
      </Typography>
      <div>
        {user ? (
          <div>
            <MessagesComp chat={messages} />
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} onUploadComplete={sendImageMessage} />
            {imagePreviewUrl.map(img => <ImageThumbnail url={img} />)}
          </div>
        ) : (
          <div>not logged in</div>
        )}
      </div>
    </Box>
  );
}

export default Messages;
