import { useControlled } from "@material-ui/core";
import { database } from "../../databaseConfig";
export const USER = "USER";
export const FETCH_USER = "FETCH_USER";
export const PROFILE = "PROFILE";
export const LOGOUT = "LOGOUT";

export const userAction = (name) => {
  return async (dispatch) => {
    var newPostKey = await database.ref().child("users");

    var newPostRef = await newPostKey.push();
    await newPostRef.set(
      {
        name: name,
        avatar:
          "http://www.gnd.center/bpm/resources/img/avatar_placeholder_small.png",
        ChatId: [0],
      },
      (err) => {
        if (err) {
          console.log("falied" + err);
        } else {
          console.log("success");
        }
      }
    );
    await newPostKey.on("value", (snap) => {
      const userData = snap.val();
      for (const Key in userData) {
        if (userData[Key].name === name) {
          dispatch({
            type: FETCH_USER,
            id: Key,
            name: userData[Key].name,
            chatId: userData[Key].ChatId,
            avatar: userData[Key].avatar,
          });
        }
      }
    });
    // dispatch({ type: USER, name: name })
  };
};

export const fetchUser = (name) => {
  return async (dispatch) => {
    let admin;
    let Data;
    const UserData = database.ref().child("users");

    await UserData.on("value", (snap) => {
      const userData = snap.val();
      for (const Key in userData) {
        if (userData[Key].name === name) {
          admin = userData[Key].name;
          Data = userData[Key];
          dispatch({
            type: FETCH_USER,
            id: Key,
            name: userData[Key].name,
            chatId: userData[Key].ChatId,
            avatar: userData[Key].avatar,
          });
        }
      }
    });
    console.log(Data);

    if (!admin) {
      console.log("here");
      throw new Error("user not found");
    }
  };
};
export const Logout = () => {
  return { type: LOGOUT };
};

export const addProfile = (name, url) => {
  return async (dispatch) => {
    var NewChat = await database.ref("users").child(name);
    await NewChat.update({
      avatar: url,
    });
  };
};

export const fetchFriend = (name) => {
  return async (dispatch) => {
    let admin;
    let Data;
    const UserData = database.ref().child("users");

    await UserData.on("value", (snap) => {
      const userData = snap.val();
      for (const Key in userData) {
        if (userData[Key].name === name) {
          admin = userData[Key].name;
          Data = userData[Key];
          // dispatch({
          //   type: FETCH_USER,
          //   id: Key,
          //   name: userData[Key].name,
          //   chatId: userData[Key].ChatId,
          //   avatar: userData[Key].avatar,
          // });
        }
      }
    });
    console.log(Data);
    if (!admin) {
      console.log("here");
      throw new Error("user not found");
    }
    return Data;
  };
};
