import { Box } from "@mui/material";
import React from "react";
import { auth } from "../firebase";

export default function ImageThumbnail({ url }) {

  if (url) {
    return (
      <img src={url} width="100px" />
    );
  } else {
    return null;
  }
}
