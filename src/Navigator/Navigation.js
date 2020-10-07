import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import AuthScreen from '../pages/AuthScreen';
import FriendPage from '../pages/FriendPage';


const Navigation = () => {
    const [user, setUser] = useState(null);

    const User = useSelector(state => (state.user.user));

    useEffect(() => {
        setUser(User)
    }, [User])

    return (
        <Switch>
            {!user && <Redirect from='/friends' to='/' exact />}
            {/* {!user && <Redirect from='/chat/:name' to='/' exact />} */}
            {user && <Redirect from='/' to='/friends' exact />}
            <Route path='/' exact component={AuthScreen} />
            <Route path='/friends' component={FriendPage} />
            {/* <Route path='/chat/:name' component={ChatScreen} /> */}
        </Switch>
    )
}

export default Navigation
