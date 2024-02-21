import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { auth, storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

const styling = {
    "sender": {
        "padding": "5px 8px 10px",
        "background": "#D2E8C2",
        "alignSelf": "flex-end",
        "borderRadius": "10%",
        "boxShadow": "#727272 0px 2px 2px",
        "margin": "0 1px 4px 0 !important"
    },
    "receiver": {
        "padding": "5px 8px 26px",
        "background": "#F4F4F4",
        "alignSelf": "flex-start",
        "borderRadius": "10%",
        "boxShadow": "#727272 0px 2px 2px",
        "margin": "0 0 4px 1px !important"
    },
    "default": {
        "padding": "5px 8px 26px",
        "background": "#F4F4F4",
        "alignSelf": "flex-start",
        "borderRadius": "10%",
        "boxShadow": "#727272 0px 2px 2px",
        "margin": "0 0 4px 1px !important"
    }
}


export default function MediaMessage({ messageData, key }) {
    const configureStorageURL = async (string) => {
        const pathReference = ref(storage, string)
        await getDownloadURL(pathReference).then(url => {
            setImageUrl(url)
        })
    }
    useEffect(() => {
        configureStorageURL(messageData.content)
    })
    const [imageUrl, setImageUrl] = useState("");
    // use auth to determine if user is a child or international buddy
    let userType = "default";
    const userUID = auth.currentUser.uid
    if(messageData.sentby){
      userType = messageData.sentby.id === userUID ? "sender" : "receiver"
    }
    const boxStyling = styling[userType]
    if (messageData.content) {
        return (
            <Box sx={boxStyling} key={key} maxWidth="min(80%, 400px)" display="flex" justifyContent="center" alignItems="center">
                <img src={imageUrl} style={{ maxWidth: "80%" }} />
            </Box>
        );
    } else {
        return null;
    }
}
