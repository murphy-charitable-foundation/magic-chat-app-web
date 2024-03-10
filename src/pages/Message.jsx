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
  const [chatId, setChatId] = useState("");

  useEffect(() => {
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

  const collectionName = "letterbox";
  const splitUrl = window.location.href.split("/")
  const letterboxId = splitUrl[splitUrl.length - 1]

  useEffect(() => {
    if (letterboxId) {
      setChatId(letterboxId)
    }
    getSubData()
  }, [userSet]);

  const getSubData = async () => {
    if(!user){
      console.log('finding user')
      await findUser()
    }
    try {
      const documentRe = doc(collection(firestore, collectionName), letterboxId);
      const subcollectionRe = collection(documentRe, "letters");
      console.log("collecting messages")
      const q = query(
        subcollectionRe,
        where("status", "==", 'sent'),
        where("deleted_at", '==', null),
        orderBy("created_at", "desc"),
        limit(PAGE_SIZE)
      );
      const subcollectionSnapshott = await getDocs(q);
      if (subcollectionSnapshott.empty) {
        setMessageDocRef(documentRe)
        return [];
      }

      const msgs = [];
      // REZ - this used to break but shouldn't anymore
      console.log(subcollectionSnapshott)
      subcollectionSnapshott.forEach((subDoc) => {
        const letter = subDoc.data();
        msgs.push({
          collectionId: subDoc.id,
          attachments: letter.attachments,
          letter: letter.letter,
          sent_by: letter.sent_by,
          status: letter.status,
          created_at: letter.created_at,
          moderation: letter.moderation_comments,
        });
        console.log('letter', letter)
        setLastMessageDoc(subDoc); // Update last document for pagination
      });
      if (user) {
        console.log('user found in get sub data')
        const pendingQ = query(
          subcollectionRe,
          where("status", "==", 'pending_review'),
          where("deleted_at", '==', null),
          orderBy("created_at", "desc"),
          where("sent_by", "==", user),
          limit(PAGE_SIZE)
        );
        const pendingSubcollectionSnapshott = await getDocs(pendingQ);
        if (!pendingSubcollectionSnapshott.empty) {
          pendingSubcollectionSnapshott.forEach((subDoc) => {
            const letter = subDoc.data();
            msgs.push({
              collectionId: subDoc.id,
              attachments: letter.attachments,
              letter: letter.letter,
              sent_by: letter.sent_by,
              status: letter.status,
              created_at: letter.created_at,
              moderation: letter.moderation_comments,
              pending: true
            });
          })
        }
      }

      // const msgs = [];
      // REZ - this used to break but shouldn't anymore
      setMessage(msgs)
      console.log('get data', messages)
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
        where("status", "==", 'sent'),
        orderBy("created_at", "desc"),
        startAfter(lastMessageDoc),
        limit(PAGE_SIZE)
      );
      console.log(lastMessageDoc)
      const subcollectionSnapshott = await getDocs(q);

      if (subcollectionSnapshott.empty) {
        console.log("No more messages available.");
        return;
      }
      console.log(subcollectionSnapshott.length)

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
    console.log(imagePreviewUrl, newMessage)
  return
    try {
      const newMessagePayload = {
        deleted_at: null,
        letter: newMessage,
        created_at: new Date(),
        status: 'pending_review',
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
    console.log('sendImageMessage')
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
            <NewMessage setNewMessage={setNewMessage} sendMessage={sendMessage} newMessage={newMessage} onUploadComplete={sendImageMessage} chatId={chatId} />
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
