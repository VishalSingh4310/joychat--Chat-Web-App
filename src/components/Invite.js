import React from "react";
import { Button, Typography } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Invite(props) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Add Friends
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {"Invite More Friends"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div>
              <Typography
                variant="overline"
                style={{
                  fontWeight: 500,
                  margin: 0,
                  color: "rgb(117 117 117)",
                  fontSize: "0.8rem",
                }}
              >
                Invite friends to JoyChat
              </Typography>
              <div style={{ display: "flex", alignItems: "center" }}>
                <input
                  value={name}
                  onChange={(text) => setName(text.target.value)}
                  style={{ padding: "0.5rem 1.5rem", marginRight: "0.5rem" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={props.inviteAction.bind(this, name)}
                >
                  Invite
                </Button>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{ justifyContent: "space-between", padding: "8px 1.5rem" }}
        >
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleClose}
            style={{ background: "#24A739", color: "white" }}
            variant="contained"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
