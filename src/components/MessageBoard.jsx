import { Stack, Box, Avatar, Typography } from "@mui/material"

export default function MessageBoard({messages}){
  return (
    <Stack
    direction="column"
    justifyContent="flex-start"
    alignItems="stretch"
    spacing={2}
  >
    {messages?.map((chat, i) => (
      <Box key={i}>
        <Stack
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          spacing={2}
        >
          <Avatar
            alt={chat.name}
            sx={{ alignContent: "end" }}
            src={chat.imgSrc}
          />
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 0 }}>
              {chat.name}
            </Typography>
            <Typography variant="paragragh">{chat.lastMessage}</Typography>
          </Stack>
          <Typography
            variant="paragraph"
            sx={{
              fontStyle: "italic",
              alignSelf: "flex-start",
              flex: 1,
              textAlign: "end",
            }}
          >
            {chat.timestamp}
          </Typography>
        </Stack>
        <Typography variant="paragragh" paddingX={2} marginX={2}>
          <hr />
        </Typography>
      </Box>
    ))}
  </Stack>
  )
}