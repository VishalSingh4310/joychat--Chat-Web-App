import React, { useEffect, useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import { ListItemAvatar } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    // maxWidth: '36ch',
    padding: 0,
  },
  inline: {
    display: "inline",
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

export default function NewChatList(props) {
  const [messageArray, setMessageArray] = useState([]);
  // console.log(props.friend);
  const classes = useStyles();
  const messages = useSelector((state) => state.message.message);
  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    messages.length !== 0 &&
      messages.map((messa) => {
        if (
          messa.partners[1] === props.friend &&
          messa.partners[0] == user.name
        )
          setMessageArray(messa.message);
      });
  }, [props.friend]);

  return (
    <List className={classes.root}>
      <ListItem
        alignItems="flex-start"
        style={{
          cursor: "pointer",
          background: props.active.name === props.friend ? "#24A739" : "#fff",
          marginBottom: "0.5rem",
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.05)",
        }}
        onClick={props.onClickHandler}
      >
        <ListItemAvatar style={{ minWidth: "30px" }}>
          <Avatar
            className={classes.small}
            alt={props.friend}
            src={props.friend.avatar}
          />
        </ListItemAvatar>
        <ListItemText
          noWarp
          primary={
            <>
              <div
                style={{
                  alignItems: "flex-end",
                  padding: "0.3rem 0",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  noWarp
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textPrimary"
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                    color:
                      props.active.name === props.friend ? "#fff" : "#24A739",
                  }}
                >
                  {props.friend}
                </Typography>
                <Typography
                  component="span"
                  variant="body2"
                  className={classes.inline}
                  color="textSecondary"
                  style={{
                    fontSize: "0.8rem",
                    color:
                      props.active.name === props.friend ? "#fff" : "#d0d0d0",
                  }}
                >
                  {messageArray.length !== 0 &&
                    moment(messageArray[messageArray.length - 1].time).format(
                      "hh:mm:a"
                    )}
                </Typography>
              </div>
              <Divider
                style={{
                  marginLeft: 0,
                  marginBottom: "0.5rem",
                  backgroundColor:
                    props.active.name === props.friend
                      ? "rgb(218 218 218)"
                      : "#dbdbdb",
                }}
                variant="inset"
                component="li"
              />
            </>
          }
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                style={{
                  fontSize: "0.8rem",
                  color:
                    props.active.name === props.friend
                      ? "#fff"
                      : "rgb(173,173,173)",
                }}
              >
                {messageArray.length !== 0 &&
                  messageArray[messageArray.length - 1].text}
              </Typography>
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
