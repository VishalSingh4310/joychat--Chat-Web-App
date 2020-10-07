import React from "react";
import { Typography } from "@material-ui/core";

const ChatStartPreview = () => {
  return (
    <div
      style={{
        height: "95vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <img
        style={{ width: "100%", height: "40%" }}
        src={`${process.env.PUBLIC_URL}/ImageFolder/Front.svg`}
        alt="xs"
      ></img>
      <div>
        <Typography
          variant="h5"
          style={{
            color: "#555",
          }}
        >
          Keep connected
        </Typography>
      </div>
    </div>
  );
};

export default ChatStartPreview;
