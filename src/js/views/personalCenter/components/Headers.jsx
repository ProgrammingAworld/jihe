import React from 'react';
import {Link} from 'react-router';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            sign: false,
            rewardPoints: window.rewardPoints
        };
        this.onClickSign = this.onClickSign.bind(this);
        this.onClickHeader = this.onClickHeader.bind(this);
    }

    onClickSign() {
        let sign = this.state.sign,
            _this = this;
        if(!sign){
            //保存埋点信息
            ws.event({
                typeCode: 1002,
                currentCode: 100218
            });

            //签到
            ws.post({
                url: '/api/user/signIn'
            }).then(function(response) {
                if(response.code == 0) {
                    let rewardPoints = response.data.rewardPoints;
                    window.rewardPoints = rewardPoints != null ? rewardPoints.toString() : '';
                    _this.setState({
                        sign: !!response.data.signInStatus,
                        rewardPoints: rewardPoints
                    })
                } else {
                    alert(response.msg);
                }
            });
        }
    }

    componentDidMount() {
        let _this = this;
        ws.get({
            url: '/api/user/personal'
        }).then(function(response) {
            if(response.code == 0) {
                let rewardPoints = response.data.points;
                window.rewardPoints = rewardPoints != null ? rewardPoints.toString() : '';
                window.phone = response.data.phone ? response.data.phone : (response.data.relatedPhone ? response.data.relatedPhone : '');
                _this.setState({
                    sign: response.data.isSigned,
                    rewardPoints: rewardPoints
                });
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=100107');
            } else {
                alert(response.msg);
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

    onClickHeader(event) {
        event.preventDefault();
        //保存埋点信息
        ws.post({
            url: '/api/event',
            data: {
                typeCode: 1002,
                currentCode: 100224,
                data: {
                    currentUrl: window.location.href,
                    timestamp: new Date().getTime()
                }
            }
        });

        //页面跳转
        history.push('/personalCenter/info?from=100107');
    }

    render() {
        let {sign, rewardPoints} = this.state,
            imgSrc,
            imgAlt;
        if(sign) {
            imgSrc = '/images/yqd.png';
            imgAlt = '已签到';
        } else {
            imgSrc = '/images/qd.png';
            imgAlt = '签到';
        }
        return (
            <div className="headers">
                <div className="mask">
                    <div className="header-img">
                        <a href="/personalCenter/info?from=100107" onClick={this.onClickHeader}>
                            <img src={window.avatarURL && window.avatarURL.length > 0 ? window.avatarURL : "/images/touxiang.png"} alt="个人头像"/>
                        </a>
                    </div>
                    <div className="myname">
                        {this.getNickName()}
                    </div>
                    <div className="myinformation">
                        {"积分：" + (rewardPoints != null ? rewardPoints : '')}
                    </div>
                    <div className="sign" onClick={this.onClickSign}><img src={imgSrc} alt={imgAlt}/></div>
                </div>
            </div>
        )
    }
}