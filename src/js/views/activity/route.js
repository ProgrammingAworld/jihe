import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Activity from './containers/Activity.jsx';
import ChristmasActivity from './containers/ChristmasActivity.jsx';
import TurntableGame from './containers/TurntableGame.jsx';

export default (
    <Route path="activity">
        <IndexRoute component={Activity}/>
        <Route path="christmas" component={ChristmasActivity}/>
        <Route path="turntable" component={TurntableGame}/>
    </Route>
)