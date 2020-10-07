import { database } from '../../databaseConfig';
export const FETCH_FRIENDS = 'FETCH_FRIENDS';

export const fetchList = () => {
    return async (dispatch, getState) => {
        const User = getState().user.user;
        const chatIds = getState().user.user.ChatId.slice(1);
        const chats = await database.ref('Chat');
        let frndData = [];
        for (let i = 0; i < chatIds.length; i++) {
            await chats.child(chatIds[i]).once('value', snaps => {
                frndData.push(snaps.val())
            })
        }
        // console.log(frndData)
        let newArray = [];
        frndData.map(frnd => {
            newArray.push(...frnd.partners)
        })
        const updatedArray = newArray.filter(frndList => frndList !== User.name)
        console.log(updatedArray)
        dispatch({
            type: FETCH_FRIENDS, friends: updatedArray
        })
    }
}

export const addFriend = (name) => {
    return async dispatch => {
        const User = await database.ref('users');
        let selectedUser = 0;
        await User.on("value", snap => {
            const userData = snap.val()
            for (const Key in userData) {
                if (userData[Key].name === name) {
                    selectedUser = 1
                }
            }
        })
        if (selectedUser) {
            console.log('ok')
            // await fetchList();
        }
        else {
            throw new Error('User not found')
        }
    }
}