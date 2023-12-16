import { Button, Stack, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import KeyboardVoiceOutlinedIcon from '@mui/icons-material/KeyboardVoiceOutlined';
import React from "react";

export default function NewMessage({ newMessage, sendMessage, setNewMessage }) {
  return (
    <Stack direction="row" alignItems="center" marginTop="12px">
      <AddIcon htmlColor="#007AFF" />
      <form onSubmit={sendMessage} style={{"width": "100%"}}>
        <Stack direction="row" alignItems="center">
          <TextField
            placeholder="Your Message..."
            multiline
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
            }}
            id="new-message"
            InputProps={{
              style: {
                borderRadius: "12px",
                padding: "4px 8px",
                minHeight: "24px",
                maxHeight: "56px",
                overflow: "hidden"
              }
            }}
            sx={{
              flex: 1,
            }}
            inputProps={{
              style: {
                overflow: "scroll"
              }
            }}
          ></TextField>
          {newMessage ? (
            <Button type="submit">Send</Button>
          ) : (
            <Stack direction="row">
              <CameraAltOutlinedIcon htmlColor="#007AFF" />
              <KeyboardVoiceOutlinedIcon htmlColor="#007AFF" />
            </Stack>
          )
          }
        </Stack>
        
      </form>
    </Stack>
  );
}
