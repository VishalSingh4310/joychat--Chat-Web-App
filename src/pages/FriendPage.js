import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as friendActions from "../store/actions/friends";
import Profile from "../components/Profile";
import * as messageActions from "../store/actions/message";
import ChatScreen from "./ChatScreen";
import { List, makeStyles } from "@material-ui/core";

import "../css/FriendPage.css";
import Search from "../components/search";
import NewChatList from "../components/NewChatList";
import Invite from "../components/Invite";
import Alerts from "../components/Alerts";

const FriendPage = (props) => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [active, setActive] = useState({ name: "", isOk: false });
  const [frndChat, setFrndChat] = useState("");

  const friendList = useSelector((state) => state.friend.friendList);
  const User = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(friendActions.fetchList());
    setList(friendList);
  }, [friendList.length, dispatch]);

  const onClickHandler = (name) => {
    setFrndChat(name);
    setActive({ name: name, isOk: true });
  };

  const nameHandler = async (name) => {
    setError(false);
    try {
      await dispatch(friendActions.addFriend(name));
      await dispatch(messageActions.messageAction(User.name, name, " "));
      await dispatch(friendActions.fetchList());
      console.log("done");
    } catch (err) {
      setError(true);
      setErrorMessage(err.message);
      console.log(err);
    }
  };

  const handleList = async (data) => {
    if ((await data.length) !== 0) {
      await setList(data);
    } else {
      setList(friendList);
    }
  };

  return (
    <>
      {error && <Alerts message={errorMessage} choose="error" />}
      {User && (
        <div className="container">
          <div className="addFriendContainer">
            <div className="profileContainer">
              <Profile />
              <div style={{ padding: "0.5rem" }}>
                <Search newListArray={handleList} Data={list} />
                <Invite inviteAction={nameHandler} />
              </div>
            </div>
            <div style={{ padding: "0.5rem" }}>
              <List>
                {list.length !== 0 &&
                  list.map((friend, index) => (
                    <NewChatList
                      key={index}
                      onClickHandler={onClickHandler.bind(this, friend)}
                      friend={friend}
                      active={active}
                    />
                  ))}
              </List>
            </div>
          </div>
          <div className="chatContainer">
            <ChatScreen friendChat={frndChat} active={active} />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendPage;
