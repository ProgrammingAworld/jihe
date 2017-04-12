import React from 'react';
import {render} from 'react-dom';
import {Router, Route, IndexRoute, Redirect, IndexRedirect} from 'react-router';
import MobilePhoneBinding from './personalCenter/containers/MobilePhoneBinding.jsx'
import gameRoute from './game/route.js';
import giftPackRoute from './gift/route.js';
import personalCenterRouter from "./personalCenter/route.js";
import systemRoute from './system/route.js';
import activityRoute from './activity/route.js';
import JiheRoute from './jihe/route.js'; 

export default class extends React.Component {

    render() {
        let {history} = this.props;
        return (
            <Router history={history}>
                <Redirect from="/" to="/game"/>
                {systemRoute}
                <Route path="/personalCenter/phone" component={MobilePhoneBinding}/>
                <Route path="/">
                    {gameRoute}
                    {giftPackRoute}
                    {personalCenterRouter}
                    {JiheRoute}
                </Route>
                {activityRoute}
            </Router>
        );
    }
}
