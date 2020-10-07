import React, { useEffect, useState } from "react";
// import ChatBox from './ChatBox';
import { useSelector } from "react-redux";
import NewChatBox from "./NewChatBox";

const ChatContainer = ({ user, props }) => {
  const [messageArray, setMessageArray] = useState([]);
  const messages = useSelector((state) => state.message.message);
  useEffect(() => {
    var chatWindow = document.getElementById("myDiv");
    var xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }, [messages, props.active.name]);

  return (
    <div
      id="myDiv"
      style={{
        paddingBottom: "1.5rem",
        overflow: "auto",
        height: "80vh",
        paddingRight: "1rem",
        paddingLeft: "1rem",
      }}
    >
      {messages.length !== 0
        ? messages.map((messa) => {
            if (
              (messa.partners[0] === props.friendChat &&
                messa.partners[1] === user.name) ||
              (messa.partners[1] === props.friendChat &&
                messa.partners[0] === user.name)
            ) {
              return messa.message.map((me, index) => {
                if (me.text !== " ") {
                  return (
                    <NewChatBox
                      key={index}
                      sender={me.sender}
                      user={user.name}
                      text={me.text}
                      time={me.time}
                    />
                  );
                }
              });
            }
          })
        : ""}
    </div>
  );
};

export default ChatContainer;
