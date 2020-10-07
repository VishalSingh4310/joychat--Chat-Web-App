import React, { useState, useRef } from "react";
import { Avatar, makeStyles, Typography, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { AddCircle } from "@material-ui/icons";
import ImageUpload from "./ImageUpload";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  large: {
    width: theme.spacing(9),
    height: theme.spacing(9),
  },
}));
const Profile = () => {
  const childRef = useRef();
  const [refresh, setRefresh] = useState(0);
  const User = useSelector((state) => state.user.user);
  const classes = useStyles();

  return (
    <div
      style={{
        background: "#168177",
        flexDirection: "column",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        paddingTop: "1rem",
        alignItems: "center",
      }}
    >
      <div
        className={classes.large}
        style={{
          position: "relative",
          overflow: "visible",
          borderRadius: "50%",
        }}
      >
        <Avatar
          className={classes.large}
          style={{ position: "relative" }}
          alt={User.name}
          src={User.avatar}
        ></Avatar>
        <IconButton
          style={{
            cursor: "pointer",
            color: "#fff",
            position: "absolute",
            right: "-5%",
            bottom: "0%",
            background: "#168177",
            padding: "2px",
          }}
          onClick={() => {
            childRef.current.onSubmit();
          }}
          aria-label="add friend"
          component="span"
        >
          <AddCircle style={{ color: "#fff" }} />
        </IconButton>
        <ImageUpload ref={childRef} />
      </div>
      <Typography
        variant="h5"
        style={{
          marginTop: "1rem",
          textTransform: "capitalize",
          color: "#fff",
        }}
        gutterBottom
      >
        {User.name}
      </Typography>
      {/* <img src={require} alt="Profile_img" style={{}}/> */}
    </div>
  );
};

export default Profile;
