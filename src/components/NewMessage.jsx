import { FileUpload } from "@mui/icons-material";
import { Button, Stack, TextField } from "@mui/material";
import React from "react";
import FileUploader from "./FileUpload";

export default function NewMessage({ newMessage, sendMessage, setNewMessage, onUploadComplete, chatId, draft }) {
  if(draft && draft.letter){
    newMessage = draft.letter
  }
  console.log("draft", draft)
  return (
    <Stack direction="row" sx={{ alignItems: "center", marginTop: "12px" }}>
      <form onSubmit={e => sendMessage(e)}>
        <TextField
          placeholder="Your Message..."
          value={newMessage}
          onChange={(e) => {
            setNewMessage(e.target.value);
          }}
          id="new-message"
          sx={{
            flex: 1,
          }}
        ></TextField>
        <FileUploader onUploadComplete={onUploadComplete} chatId={chatId} />
        <Button type="submit">Send</Button>
        <Button onClick={(e) => {
          sendMessage(e, 'draft')
        }}>Save Draft</Button>
      </form>
    </Stack>
  );
}
