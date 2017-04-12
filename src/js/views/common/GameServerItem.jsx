import React from 'react';
import history from '../history.jsx';
import {ws} from '../../lib/main.js';

function getStartedTime(startTime) {
    if(startTime == null) {
        return false;
    }
    var now = new Date().getTime(),
        start = new Date(startTime).getTime();
    return now - start;
}

function getStartedTimeString(startedTime) {
    if(startedTime < 0) {
        return "";
    } else if(startedTime < 60000) {
        return (startedTime / 1000).toFixed(0) + '秒';
    } else if(startedTime < 3600000) {
        return (startedTime / 600000).toFixed(0) + '分钟';
    } else {
        return (startedTime / 3600000).toFixed(0) + '小时';
    }
}

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.getGameTimeView = this.getGameTimeView.bind(this);
        this.enterGame = this.enterGame.bind(this);
    }


    enterGame() {
        let {data} = this.props,
            id = data.gameKey;
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: id
            }
        });

        // 进入游戏
        ws.post({
            url: '/api/game/' + id + '/launch'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=' + 100105);
            } else {
                alert(response.msg);
            }
        });
    }

    getGameTimeView(gameTime) {
        let startedTime = getStartedTime(gameTime),
            result;
        if(startedTime < 0) {
            result = (
                <td className="game-time-zone">{gameTime}</td>
            )
        } else {
            result = (
                <td className="game-time-zone">
                    <div>
                        <div className="game-time-start-info">
                            <span>已开服</span>
                            <span>{getStartedTimeString(startedTime)}</span>
                        </div>
                        <div className="game-time-btn">
                            <a href="javascript:void(0)" onClick={this.enterGame} className="btn-start">进入</a>
                        </div>
                    </div>
                </td>

            )
        }
        return result;
    }

    render() {
        let {data} = this.props,
            {gameName, serverName, startTime, gameKey, gameIcon} = data;
        let gameTimeView = this.getGameTimeView(startTime);
        return (
            <table className="game-zone-item">
                <tbody>
                    <tr>
                        <td className="game-icon-zone">
                            <img className="game-icon" src={gameIcon}/>
                        </td>
                        <td className="game-info-zone">
                            <div>
                                <div className="game-name">{gameName ? gameName : ''}</div>
                                <div className="zone-name">{serverName ? serverName : ''}</div>
                            </div>
                        </td>
                        {gameTimeView}
                    </tr>
                </tbody>
            </table>
        )

    }

}