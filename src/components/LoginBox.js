import React, { useState } from "react";
import {
  TextField,
  Button,
  makeStyles,
  Divider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiInputBase-input": {
      color: "#fff",
    },
  },
}));

const LoginBox = (props) => {
  const [name, setName] = useState("");
  const classes = useStyles();

  return (
    <div
      style={{
        overflow: "hidden",
        color: "white",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ minWidth: "400px", width: "30%", minHeight: "50vh" }}>
        <Typography variant="h5" style={{ fontWeight: 500, margin: 0 }}>
          Here you can Login
        </Typography>
        <Typography
          variant="overline"
          style={{
            color: "#7d72a7",
            padding: 0,
            margin: 0,
            fontSize: "0.9rem",
          }}
        >
          Let's join us
        </Typography>
        <br />
        <TextField
          InputProps={{
            className: classes.root,
          }}
          value={name}
          onChange={(text) => setName(text.target.value)}
          fullWidth
          autoFocus={true}
          style={{
            color: "white",
            background: "#000a25",
            marginBottom: "1rem",
            marginTop: "2rem",
          }}
          id="outlined-basic"
          label="Username"
          variant="outlined"
        />

        <br />
        <Button
          fullWidth
          variant="contained"
          style={{
            color: "#fff",
            background:
              "linear-gradient(90deg, rgba(64,20,184,1) 0%, rgba(55,26,171,1) 0%, rgba(105,44,154,1) 100%)",
          }}
          onClick={props.submitHandler.bind(this, name)}
        >
          LOGIN
        </Button>
        <div
          style={{ display: "flex", alignItems: "center", margin: "1rem 0" }}
        >
          <Divider
            variant="middle"
            component="span"
            style={{ width: "40%", background: "rgb(128 128 128)" }}
          />
          <Typography variant="body1" style={{ width: "20%" }}>
            or
          </Typography>
          <Divider
            variant="middle"
            component="span"
            style={{ width: "40%", background: "rgb(128 128 128)" }}
          />
        </div>
        <Button
          fullWidth
          variant="contained"
          style={{
            color: "#fff",
            background:
              "linear-gradient(90deg, rgba(64,20,184,1) 0%, rgba(55,26,171,1) 0%, rgba(105,44,154,1) 100%)",
          }}
          onClick={props.registerHandler.bind(this, name)}
        >
          SIGNUP
        </Button>
      </div>
    </div>
  );
};

export default LoginBox;
