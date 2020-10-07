import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase, makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    // marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      //   marginLeft: theme.spacing(2),
      width: "auto",
    },
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
    border: "1px solid #dbdbdb",
    borderRadius: "5px",
    width: "100%",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Search = (props) => {
  const classes = useStyles();
  const [text, setText] = useState("");
  const [result, setResult] = useState([]);

  const match = async (e) => {
    setResult([""]);
    const p = Array.from(text).reduce(
      (a, v, i) => `${a}[^${text.substr(i)}]*?${v}`,
      ""
    );
    const re = await RegExp(p);
    await setResult(props.Data.filter((v) => v.match(re)));
    await props.newListArray(result);
  };

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon style={{ color: "#dbdbdb" }} />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ "aria-label": "search" }}
        onChange={(text) => setText(text.target.value)}
        onKeyPress={match}
        value={text}
      />
    </div>
  );
};

export default Search;
