import { Button, Stack } from "@mui/material";
import React from "react";

export default function MessagesFilters() {
  const buttons = [
    { text: "New messages" },
    { text: "Incoming messages" },
    { text: "My drafts" },
  ];
  return (
    <Stack direction="row" display="flex" flexWrap="nowrap" overflow="scroll">
      {buttons.map((b) => (
        <Button
          variant="contained"
          disableElevation
          sx={{
            minWidth: "160px",
            background: "#6750A414",
            color: "#4E802A",
            margin: "0 10px",
            fontWeight: 600,
            textTransform: "none",
            borderRadius: "24px",
            whiteSpace: "nowrap"
          }}
        >
          {b.text}
        </Button>
      ))}
    </Stack>
  );
}
