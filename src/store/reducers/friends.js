import { FETCH_FRIENDS } from '../actions/friends'
const initialState = {
    friendList: []
}

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_FRIENDS: {
            return {
                ...state,
                friendList: action.friends
            }
        }
        default:
            return state
    }
}
export default friendReducer