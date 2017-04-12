import React from 'react';
import GameLaunch from '../components/GameLaunch.jsx';

export default class extends React.Component {

    render() {
        //强制绑定key，实现当id变化时，remount新组件，触发新的数据请求
        return (
            <GameLaunch {...this.props} key={this.props.params.id}/>
        );
    }
}