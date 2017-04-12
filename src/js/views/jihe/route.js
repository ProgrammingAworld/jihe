import React from 'react';
import {Route, IndexRoute} from 'react-router';
import JiheView from './containers/JiheView.jsx';
// import GameDetailPage from './containers/GameDetailPage.jsx';
// import GameLaunchPage from './containers/GameLaunchPage.jsx';

export default (
    <Route path="jihe">
        <IndexRoute component={JiheView}/>
        {/* <Route path=":id" component={GameDetailPage}/>
        <Route path=":id/launch" component={GameLaunchPage}/> */}
    </Route>
)
