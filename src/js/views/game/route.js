import React from 'react';
import {Route, IndexRoute} from 'react-router';
import GameView from './containers/GameView.jsx';
import GameDetailPage from './containers/GameDetailPage.jsx';
import GameLaunchPage from './containers/GameLaunchPage.jsx';

export default (
    <Route path="game">
        <IndexRoute component={GameView}/>
        <Route path=":id" component={GameDetailPage}/>
        <Route path=":id/launch" component={GameLaunchPage}/>
    </Route>
)