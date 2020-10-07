import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import userReducer from "./store/reducers/user";
import { composeWithDevTools } from "redux-devtools-extension";
import Navigation from "./Navigator/Navigation";
import { messageReducer } from "./store/reducers/message";
import friendReducer from "./store/reducers/friends";
import ReduxThunk from "redux-thunk";

function App() {
  const rootReducer = combineReducers({
    user: userReducer,
    message: messageReducer,
    friend: friendReducer,
  });

  const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(ReduxThunk))
  );

  return (
    <Router>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </Router>
  );
}

export default App;
