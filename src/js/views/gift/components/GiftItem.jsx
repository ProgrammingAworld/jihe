import React from 'react';
import Progress from '../../common/Progress.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.getGiftIntroduction = this.getGiftIntroduction.bind(this);
        this.openCollarNumber = this.openCollarNumber.bind(this);
        this.gotoGame = this.gotoGame.bind(this);
        this.state = {
            hasReceiveCode: false
        }
    }

    openMoreDialog(content) {
        this.props.openDialog(content);
    }

    openCollarNumber() {
        let {data, openCollarNumberDialog} = this.props,
            id = data.giftId,
            _this = this;
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100214,
            data: {
                id: id
            }
        });

        ws.get({
            url: '/api/gift/' + id + '/code'
        }).then(function(response) {
            if(response.code == 0) {
                _this.setState({
                    hasReceiveCode: true
                });
                let content, header, explain;
                content = response.data;
                header = '信息提示';
                explain = data.comment;
                openCollarNumberDialog(content,header,explain);
            } else if(response.code == 401 || response.code == 403) {
                history.push('/login?from=100105');
            } else {
                alert(response.msg);
            }
        })
    }

    getGiftIntroduction(content) {
        const MAX_LENGTH = 16;
        let view;
        if(content.length > MAX_LENGTH) {
            let _content = content.substring(0, MAX_LENGTH);
            view = (
                <div>
                    <span>{_content}</span>
                    <a className="btn-more" href="javascript:void(0)" onClick={this.openMoreDialog.bind(this, content)}>{'更多>>'}</a>
                </div>
            )
        } else {
            view = (
                <div>
                    {content}
                </div>
            )
        }
        return view;
    }

    gotoGame() {
        let {data} = this.props,
            {gameId} = data;
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: gameId
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

    render() {
        let {data} = this.props,
            {hasReceiveCode} = this.state,
            gameIcon = data.gameIcon ? data.gameIcon : '',
            giftName = data.giftName ? data.giftName : '',
            content = data.content ? data.content : '',
            giftNumLeft = data.unUsedCount != null ? data.unUsedCount : '',
            giftNumTotal = data.totalCount != null ? data.totalCount : '',
            percent = data.unUsedCount != null && data.totalCount != null && data.totalCount != 0 && data.unUsedCount <= data.totalCount ? data.unUsedCount/ data.totalCount: 0,
            giftIntroduction = this.getGiftIntroduction(content);
        return (
            <table className="gift-item">
                <tbody>
                    <tr>
                        <td className="game-icon-zone">
                            <img className="game-icon" src={gameIcon}/>
                        </td>
                        <td className="gift-info-zone">
                            <div className="gift-name">{giftName}</div>
                            <div className="gift-introduction">
                                {giftIntroduction}
                            </div>
                            <div className="gift-percent">
                                <Progress value={percent}/>
                            </div>
                            <div className="gift-num">
                                <span>礼包剩余：</span>
                                <span>{giftNumLeft}</span>
                                <span>个</span>
                            </div>
                        </td>
                        <td className="gift-btn-zone">
                            <a className="gift-btn" href="javascript:void(0)" onClick={hasReceiveCode ? this.gotoGame : this.openCollarNumber}>{hasReceiveCode ? '进入' : '领号'}</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        )
    }
}