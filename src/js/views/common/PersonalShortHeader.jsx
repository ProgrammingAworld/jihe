import React from 'react';
import FollowWeixinDialog from './FollowWexinDialog.jsx';
import {ws} from '../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            followDialog: {
                hide: true
            },
            rewardPoints: 0
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
    }

    componentDidMount() {
        let _this = this;
        if(window.userId && window.userId.length > 0) {
            ws.get({
                url: '/api/user/personal'
            }).then(function(response) {
                if(response.code == 0) {
                    let rewardPoints = response.data.points;
                    window.rewardPoints = rewardPoints != null ? rewardPoints.toString() : '';
                    window.phone = response.data.phone ? response.data.phone : (response.data.relatedPhone ? response.data.relatedPhone : '');
                    _this.setState({
                        rewardPoints: rewardPoints
                    });
                } else if(response.code == 401 || response.code == 403) {
                    history.replace('/login');
                } else {
                    alert(response.msg);
                }
            });
        }
    }

    openDialog() {
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100207
        });

        this.setState({
            followDialog: {
                hide: false
            }
        });
    }

    closeDialog() {
        this.setState({
            followDialog: {
                hide: true
            }
        });
    }

    getNickName() {
        if(window.userId && window.userId.length > 0) {
            if(window.nickName && window.nickName.length > 0) {
                return window.nickName;
            } else {
                return window.phone;
            }
        } else {
            return '游客';
        }
    }

    render() {
        let {followDialog, rewardPoints} = this.state;
        return (
            <div className="personal-header-short">
                <div className="header-container">
                    <div className="header-btn" onClick={this.openDialog}>
                        关注
                    </div>
                    <div className="header-title">
                        <div className="title-container">
                            <div className="title-name">{this.getNickName()}</div>
                            <div className="title-score">
                                <span>积分： </span>
                                <span>{rewardPoints != null ? rewardPoints : ''}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-img-container">
                    <img className="header-img" alt='个人头像' src={window.avatarURL && window.avatarURL.length > 0 ? window.avatarURL : "images/touxiang.png"}/>
                </div>
                <FollowWeixinDialog hide={followDialog.hide} close={this.closeDialog}/>
            </div>
        );
    }

}