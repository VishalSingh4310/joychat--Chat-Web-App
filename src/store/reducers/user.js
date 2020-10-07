import { FETCH_USER, LOGOUT, USER, PROFILE } from "../actions/user";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, actions) => {
  switch (actions.type) {
    case USER:
      return {
        ...state,
        user: { name: actions.name },
      };

    case FETCH_USER:
      return {
        ...state,
        user: {
          id: actions.id,
          name: actions.name,
          avatar: actions.avatar,
          ChatId: actions.chatId,
        },
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
      };
    case PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          avatar: actions.url,
        },
      };

    default:
      return state;
  }
};
export default userReducer;
