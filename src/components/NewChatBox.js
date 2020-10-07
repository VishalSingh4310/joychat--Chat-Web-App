import React from "react";
import moment from "moment";
import { Typography } from "@material-ui/core";

const NewChatBox = (props) => {
  const data = moment(props.time).format("hh:mm:a");
  const isAdmin = props.sender === props.user ? true : false;
  return (
    <div
      style={{
        marginTop: "1.5rem",
        display: "flex",
        justifyContent: isAdmin ? "flex-end" : "flex-start",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <img
          style={{
            order: isAdmin ? 2 : "initial",
            width: "3vh",
            height: "3vh",
            objectFit: "cover",
            borderRadius: "50%",
          }}
          alt="Cindy Baker"
          src="https://images.unsplash.com/photo-1599067228596-e5c2144a85f2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=880&q=80"
        />
        <div style={{ fontFamily: "poppins", padding: "0 0.5rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              component="span"
              variant="body2"
              style={{
                order: isAdmin ? 2 : "initial",
                color: "#797979",
              }}
            >
              {props.sender}
            </Typography>
            <Typography
              variant="caption"
              component="span"
              style={{
                marginLeft: isAdmin ? 0 : "1.5rem",
                marginRight: isAdmin ? "1.5rem" : 0,
                color: "rgb(173 173 173)",
              }}
            >
              {data}
            </Typography>
          </div>
          <div
            style={{
              float: isAdmin ? "right" : "left",
              width: "fit-content",
              borderRadius: "7px",
              marginTop: "0.5rem",
              padding: "0.5rem",
              background: isAdmin ? "rgb(36, 167, 57)" : "#dbdbdb",
              borderTopRightRadius: isAdmin ? 0 : "7px",
              borderTopLeftRadius: isAdmin ? "7px" : 0,
            }}
          >
            <Typography
              variant="body1"
              component="span"
              style={{
                padding: "0.5rem 1rem",
                color: isAdmin ? "rgb(255, 255, 255)" : "#5a5a5a",
                fontSize: "0.9rem",
              }}
            >
              {props.text}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewChatBox;
