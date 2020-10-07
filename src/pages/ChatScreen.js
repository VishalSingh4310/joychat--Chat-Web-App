import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as messageActions from "../store/actions/message";
import ImageUpload from "../components/ImageUpload";

import {
  Button,
  TextField,
  Box,
  Typography,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core";
import Logout from "../components/Logout";
// import { Send } from '@material-ui/icons'

import ChatContainer from "../components/ChatContainer";
import ChatStartPreview from "../components/ChatStartPreview";

const ChatScreen = (props) => {
  const [message, setMessage] = useState("");
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const sendMessage = async (e) => {
    if (e.which === 13 || e.which === undefined) {
      if (message !== "" && props.friendChat !== "") {
        await dispatch(
          messageActions.messageAction(user.name, props.friendChat, message)
        );
        setMessage("");
      }
    }
  };

  useEffect(() => {
    dispatch(messageActions.fetchData());
  }, [dispatch]);

  // console.log(messages)

  return (
    <div>
      <ImageUpload />

      {/* {props.active.isOk &&
               } */}
      {!props.active.isOk && <ChatStartPreview />}
      {props.active.isOk && (
        <>
          <Box
            style={{
              boxShadow: "1px 2px 2px rgba(0,0,0,0.1)",
              padding: "0.5rem 1rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <ListItemAvatar>
                  <Avatar alt={props.active.name} src={user.avatar} />
                </ListItemAvatar>
                <Typography
                  style={{
                    color: "rgb(36, 167, 57)",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {props.active.name}
                </Typography>
              </div>
              <Logout />
            </div>
          </Box>
          <div
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              background: "#fff",
              padding: "0.5rem",
            }}
          >
            <TextField
              onKeyPress={sendMessage}
              value={message}
              onChange={(text) => setMessage(text.target.value)}
              style={{ flex: 1 }}
              label="Type a message "
            />

            <Button
              onClick={sendMessage}
              variant="contained"
              style={{
                margin: "0 0rem 0 1.5rem",
                background: "rgb(36, 167, 57)",
                color: "white",
                fontFamily: "poppins",
              }}
            >
              Send
            </Button>
          </div>
          <ChatContainer user={user} props={props} />
        </>
      )}
    </div>
  );
};

export default ChatScreen;
