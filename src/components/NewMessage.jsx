import { Button, Stack, TextField } from "@mui/material";
import React, { useEffect } from "react";
import FileUploader from "./FileUpload";

export default function NewMessage({ newMessage, sendMessage, setNewMessage, onUploadComplete, chatId, draft }) {
  useEffect(() => {
    if (draft && draft.letter) {
      setNewMessage(draft.letter);
    }
  }, [draft]);
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
