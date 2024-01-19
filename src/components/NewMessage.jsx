import { Button, Stack, TextField } from "@mui/material";
import React from "react";

export default function NewMessage({ newMessage, sendMessage, setNewMessage }) {
  return (
    <Stack direction="row" sx={{ alignItems: "center", marginTop: "12px" }}>
      <form onSubmit={sendMessage}>
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
        <Button type="submit">Send</Button>
      </form>
    </Stack>
  );
}
