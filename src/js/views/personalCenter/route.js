import React from 'react';
import {Route, IndexRoute} from 'react-router';
import PersonalInfoView from "./containers/PersonalInfoView.jsx";
import PersonalGameView from "./containers/PersonalGameView.jsx";
import MobilePhoneBinding from "./containers/MobilePhoneBinding.jsx";

export default (
    <Route path="personalCenter">
        <IndexRoute component={PersonalGameView}/>
        <Route path="game" component={PersonalGameView}/>
        <Route path="info" component={PersonalInfoView}/>
    </Route>
)