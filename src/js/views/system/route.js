import React from 'react';
import {Route} from 'react-router';
import LoginPage from './containers/LoginPage.jsx';
import RegisterPage from './containers/RegisterPage.jsx';

export default (
    <Route path="/">
        <Route path="login" component={LoginPage}/>
        <Route path="register" component={RegisterPage}/>
    </Route>
)