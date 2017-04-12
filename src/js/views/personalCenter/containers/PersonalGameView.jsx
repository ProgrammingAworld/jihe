import React from 'react';
import Headers from '../components/Headers.jsx';
import MyGames from '../components/MyGames.jsx';
import App from '../../common/App.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    componentDidMount(){
        document.title = 'A站游戏-游戏中心';
        let currentCode = this.props.params.from;
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: currentCode,
            targetCode: 100107
        });
    }

    render() {
        return (
            <App active="geren">
                <div className="personal-games">
                    <Headers/>
                    <MyGames/>
                </div>
            </App>

        )
    }
}