import { Stack, Box, Link } from "@mui/material";

export default function MessageBoard({ messages = [] }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {messages.length && messages.map((chat, i) => (
        <Box key={i} sx={{ background: "#F5F5F5", padding: "8px 16px" }}>
          <Link
            href={`/messages/${chat.letterboxId}`}
            sx={{ textDecoration: "none" }}
          >
            Chat with: {chat.receiver}
            <br />
            <p>{chat.letter}</p>
            <br />
          </Link>
        </Box>
      ))}
    </Stack>
  );
}
