import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alerts from "../components/Alerts";
import LoginBox from "../components/LoginBox";
import * as userAction from "../store/actions/user";

const AuthScreen = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const submit = async (name) => {
    setError(false);
    setErrorMessage(null);
    if (name !== "") {
      try {
        await dispatch(userAction.fetchUser(name));
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
      }
    }
  };

  const register = async (name) => {
    setError(false);
    setErrorMessage(null);
    if (name !== "") {
      try {
        await dispatch(userAction.userAction(name));
      } catch (err) {
        setError(true);
        setErrorMessage(err.message);
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url(/ImageFolder/Bg.png)",
        overflow: "hidden",
        maxheight: "100vh",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      {error && <Alerts message={errorMessage} choose="error" />}
      <LoginBox submitHandler={submit} registerHandler={register} />
    </div>
  );
};

export default AuthScreen;
