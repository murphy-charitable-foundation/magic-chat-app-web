import { Done } from "@mui/icons-material";
import { Stack, Box, Avatar, Typography, Link } from "@mui/material";

export default function MessageBoard({ messages, socket }) {
  return (
    <Stack
      direction="row"
      justifyContent="flex-start"
      alignItems="stretch"
      spacing={2}
      width="100%"
      overflow="scroll"
    >
      {messages?.map((chat, i) => (
        <Box
          key={i}
          sx={{
            background: "#FFFFFF",
            padding: "8px 16px",
            maxWidth: "55%",
            minWidth: "55%",
            height: "240px",
            margin: "0 12px !important",
            boxShadow: "4px 4px 15px 0px #0000001A",
          }}
        >
          <Link
            href={`/messages/${chat.senderId}`}
            sx={{ textDecoration: "none" }}
          >
            <Stack
              direction="column"
              justifyContent="space-between"
              spacing={2}
              height="100%"
              position="relative"
            >
              {chat.messageStatus === "under review" && (
                <Stack position="absolute" top="0px" left="0px">
                  <Done />
                </Stack>
              )}
              {chat.messageStatus === "review complete" && (
                <Stack position="absolute" top="0px" left="0px">
                  <Done
                    sx={{ position: "absolute", left: "0px", top: "0px" }}
                  />
                  <Done
                    sx={{ position: "absolute", left: "7px", top: "0px" }}
                  />
                </Stack>
              )}
              <Stack alignSelf="end">icon</Stack>
              <Typography
                variant="span"
                sx={{ color: "#3F4945", mt: "0 !important" }}
              >
                {chat.lastMessage}
              </Typography>
              <Stack
                direction="column"
                justifyContent="flex-start"
                alignItems="start"
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "500", mt: 0, color: "#000" }}
                >
                  {chat.name}
                </Typography>
                <Typography
                  variant="paragraph"
                  sx={{
                    color: "#878787",
                    alignSelf: "flex-start",
                    flex: 1,
                  }}
                >
                  {chat.timestamp}
                </Typography>
              </Stack>
            </Stack>
          </Link>
        </Box>
      ))}
    </Stack>
  );
}
