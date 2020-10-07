import { FETCH, NEW_FETCH, SPEED } from "../actions/message";

const initialState = {
    message: [],
    speed: ''
}

export const messageReducer = (state = initialState, actions) => {
    switch (actions.type) {

        case FETCH: {
            const Data = actions.data;

            let messageArray = [];
            for (const Key in Data) {
                messageArray.push({
                    id: Key,
                    message: Data[Key].message,
                    partners: Data[Key].partners
                })
            }
            return {
                ...state,
                message: messageArray
            }
        }
        case NEW_FETCH: {
            return {
                ...state,
                message: actions.data
            }
        }
        case SPEED: {
            return {
                ...state,
                speed: actions.speed
            }
        }

        default:
            return state;
    }
}