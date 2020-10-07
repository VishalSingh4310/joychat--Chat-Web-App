import { database } from '../../databaseConfig';
export const FETCH = 'FETCH';
export const NEW_FETCH = 'NEW_FETCH';
export const SPEED = 'SPEED';

export const messageAction = (sender, friend, text) => {
    return async (dispatch, getState) => {
        const userLog = getState().user.user;
        // console.log(userLog.user)
        let ChatIndex;
        let chatDetail;
        const newMessage = {
            message: [{ text: text, sender: sender, time: Date.now() }],
            partners: [sender, friend]

        }

        var Chats = await database.ref('Chat');

        //find friends chat 

        await Chats.on('value', snap => {
            const chatData = snap.val();
            for (const Key in chatData) {
                if ((chatData[Key].partners[1] === friend && chatData[Key].partners[0] === userLog.name || chatData[Key].partners[0] === friend && chatData[Key].partners[1] === userLog.name)) {
                    ChatIndex = Key;
                    chatDetail = chatData[Key]
                    // console.log('chat')
                    // console.log(Key)
                }
            }
        })
        //if chat exist
        if (ChatIndex) {
            // console.log('update')
            var NewChat = await database.ref('Chat').child(ChatIndex);
            await NewChat.update({
                message: [...chatDetail.message, { text: text, sender: sender, time: Date.now() }]
            })
        }

        //if not exist create new one
        else {
            // console.log('add new')
            await Chats.push(newMessage, callback => {
                console.log(callback)
            })
        }


        //user
        let keyArray = [];
        let friendKey;
        let friendChats;

        await Chats.on('value', snap => {
            const details = snap.val()
            for (const Key in details) {
                if (details[Key].partners[0] === userLog.name && details[Key].partners[1] === friend) {
                    keyArray.push(Key)
                }
            }
        })

        if (keyArray.length !== 0) {
            var User = await database.ref('users').child(userLog.id);
            const friendData = await database.ref('users');
            await friendData.on('value', snap => {
                const data = snap.val();
                for (const key in data) {
                    if (data[key].name === friend) {

                        friendKey = key;
                        friendChats = data[key].ChatId

                    }
                }
            })

            let filterFriendChat = [...friendChats.concat(keyArray)] //to remove duplicates
            let filterAdminChat = [...userLog.ChatId.concat(keyArray)]  //to remove duplicates

            friendData.child(friendKey).update({
                ChatId: [...new Set(filterFriendChat)]
            })
            User.update({
                ChatId: [...new Set(filterAdminChat)]
            })
        }

    }
}

export const fetchData = () => {
    return async dispatch => {

        const data = database.ref().child('speed');
        const Messagedata = database.ref('Chat');
        Messagedata.on('value', snap => {

            dispatch({ type: FETCH, data: snap.val() })
        })
        data.on('value', snap => {

            dispatch({ type: SPEED, speed: snap.val() })
        })
    }
}

export const newFetch = () => {
    return async dispatch => {

        const data = await database.ref('/message').on('child_added').then(function (snapshot) {
            return snapshot.val();
        });

        let messageArray = [];
        for (const Key in data) {
            messageArray.push({
                id: Key,
                message: data[Key].message,
                sender: data[Key].sender
            })
        }
        dispatch({ type: NEW_FETCH, data: messageArray })
    }
}
