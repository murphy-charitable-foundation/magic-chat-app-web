import { Stack, Box, Link } from "@mui/material";

export default function MessageBoard({ messages }) {
  return (
    <Stack
      direction="column"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
    >
      {messages?.map((chat, i) => (
        <Box key={i} sx={{ background: "#F5F5F5", padding: "8px 16px" }}>
          <Link
            href={`/messages/${chat.name.path.split("/")[1]}`}
            sx={{ textDecoration: "none" }}
          >
            Chat with: {chat.name.path}
            <br />
            Last Message: {chat.lastMessage.content}
            <br />
            Sent at: {chat.lastMessage.created_at}
          </Link>
        </Box>
      ))}
    </Stack>
  );
}
