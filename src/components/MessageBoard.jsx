import { Stack, Box, Avatar, Typography, Link } from "@mui/material";

export default function MessageBoard({ messages, socket }) {
  console.log(messages)
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
            href={`/messages/${chat}`}
            sx={{ textDecoration: "none" }}
          >
            {chat}
            {/* <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Avatar
                alt={chat.name}
                sx={{ alignContent: "end", height: "54px", width: "54px" }}
                src={chat.imgSrc}
              />
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="start"
                spacing={2}
                >
                <Typography variant="h5" sx={{ fontWeight: "600", mt: 0, color: "#000" }}>
                  {chat.name}
                </Typography>
                <Typography variant="span" sx={{color: "#3F4945", mt: "0 !important"}}>{chat.lastMessage}</Typography>
              </Stack>
              <Typography
                variant="paragraph"
                sx={{
                  color: "#878787",
                  alignSelf: "flex-start",
                  flex: 1,
                  textAlign: "end",
                }}
              >
                {chat.timestamp}
              </Typography>
            </Stack> */}
          </Link>
        </Box>
      ))}
    </Stack>
  );
}
