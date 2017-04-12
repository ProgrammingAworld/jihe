import React from 'react';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: []
        };
        this.getItemViews = this.getItemViews.bind(this);
    }

    componentDidMount() {
        let _this = this;
        if(userId && userId != "") {
            ws.get({
                url: '/api/user/games'
            }).then(function(response) {
                if(response.code == 0) {
                    _this.setState({
                        datas: response.data
                    });
                } else {
                    alert(response.msg);
                }
            })
        }
    }

    gotoGame(id) {
        if(id) {
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
    }

    getItemViews(datas) {
        let _this = this;
        return _.map(datas, function(item) {
            let {gameId, gameName, gameIcon} = item,
                key = gameId ? gameId : _.uniqueId();
            return (
                <td key={key}>
                    <a className="recent-game-item" href="javascript:void(0)" onClick={_this.gotoGame.bind(_this, gameId)}>
                        <img className="game-icon" src={gameIcon} alt={gameName}/>
                        <div className="game-name" title={gameName}>{gameName}</div>
                    </a>
                </td>
            )
        })
    }

    render() {
        let {datas} = this.state;
        let itemViews = this.getItemViews(datas);
        return (
            <div className="recent-game" style={{display: datas && datas.length > 0 ? 'block' : 'none'}}>
                <div className="header">
                    <div className="header-title">最近在玩</div>
                </div>
                <div className="content">
                    <table className="recent-game-zone">
                        <tbody>
                            <tr>
                                {itemViews}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="game-zone-separator"></div>
            </div>
        )
    }

}