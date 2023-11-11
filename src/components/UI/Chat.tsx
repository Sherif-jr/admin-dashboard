import { Box, Card, Divider, Stack } from "@mui/material";
import React from "react";

const Chat = () => {
  return (
    <Card sx={{ width: 200, height: 300, borderRadius: 2 }}>
      <Stack direction="row">
        <Box></Box>
        <Divider />
        <Box></Box>
      </Stack>
    </Card>
  );
};

export default Chat;
