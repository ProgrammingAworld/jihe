import React from 'react';
import Progress from '../../common/Progress.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.openCollarNumber = this.openCollarNumber.bind(this);
        this.getGiftIntroduction = this.getGiftIntroduction.bind(this);
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
                id: id,
                timestamp: new Date().getTime(),
                currentUrl: window.location.href
            }
        });

        //领号
        ws.get({
            url: '/api/gift/' + id + '/code'
        }).then(function(response) {
            if(response.code == 0) {
                _this.setState({
                    hasReceiveCode: true
                });
                let content, header, explain;
                content = response.data;
                header = '优森提示';
                explain = data.comment;
                openCollarNumberDialog(content,header,explain);
            } else if(response.code == 401 || response.code == 403) {
                history.push('/login');
            }else {
                alert(response.msg);
            }
        })
    }

    getGiftIntroduction(content) {
        const MAX_LENGTH = 20;
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
        let id = this.props.data.gameId;
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
                history.replace('/login?from=' + 100102);
            } else {
                alert(response.msg);
            }
        });
    }

    render() {
        let {data} = this.props,
            {hasReceiveCode} = this.state,
            giftName = data.giftName ? data.giftName : '',
            content = data.content ? data.content : '',
            giftNumLeft = data.unUsedCount != null ? data.unUsedCount : '',
            giftNumTotal = data.totalCount != null ? data.totalCount : '',
            percent = data.unUsedCount != null && data.totalCount ? (data.totalCount - data.unUsedCount) * 100 / data.totalCount : 0,
            giftIntroduction = this.getGiftIntroduction(content);
        return (
            <div className="game-detail-gift-item">
                <div className="gift-info">
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
                </div>
                <a className="gift-btn"  onClick={hasReceiveCode ? this.gotoGame : this.openCollarNumber}>{hasReceiveCode ? '进入' : '领号'}</a>
            </div>
        )
    }

}