import React from 'react';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.gotoGameDetail = this.gotoGameDetail.bind(this);
        this.gotoGameEnter = this.gotoGameEnter.bind(this);
    }

    gotoGameDetail() {
        let {data} = this.props,
            id = data.gameKey;
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: 100101,
            targetCode: 100102,
            data: {
                currentUrl: location.href,
                targetUrl: location.protocol + location.host + '/game/' + id,
                timestamp: new Date().getTime(),
                id: id
            }
        });
        // 页面跳转
        history.push('/game/' + id + '?from=100101');
    }

    gotoGameEnter(event) {
        event.preventDefault();
        event.stopPropagation();
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
                history.replace('/login?from=' + 100101);
            } else {
                alert(response.msg);
            }
        });
    }

    render() {
        let {data} = this.props,
            {gameName, gameTag, gameAbstract, gameIcon} = data;
        let gameTags = gameTag ? gameTag.split(",") : [],
            gameTag1 = gameTags[0] ? gameTags[0] : '热门',
            gameTag2 = gameTags[1] ? gameTags[1] : '精品';
        return (
            <table className="hot-game-item" onClick={this.gotoGameDetail}>
                <tbody>
                    <tr>
                        <td>
                            <img className="item-icon" src={gameIcon}/>
                        </td>
                        <td className="item-info">
                            <div className="item-title">
                                <div className="title-text">{gameName ? gameName : ''}</div>
                                <div className="title-label label-hot">{gameTag1}</div>
                                <div className="title-label label-jingpin">{gameTag2}</div>
                            </div>
                            <div className="item-introduction">{gameAbstract ? gameAbstract : ''}</div>
                        </td>
                        <td className="item-btn-zone">
                            <a className="enter-btn" href="javascript:void(0)" onClick={this.gotoGameEnter}>进入</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}