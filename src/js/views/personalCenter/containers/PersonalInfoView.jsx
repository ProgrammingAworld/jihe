import React from 'react';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userId: window.userId,
            phone: null,
            loginType: null
        }
        this.onBindPhoneClick = this.onBindPhoneClick.bind(this);
    }

    componentDidMount(){
        document.title = '个人信息';
        let _this = this;
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100113
        });

        ws.get({
            url: '/api/user/personal'
        }).then(function(response) {
            if(response.code == 0) {
                let phone = response.data.phone ? response.data.phone : (response.data.relatedPhone ? response.data.relatedPhone : '');
                window.phone = phone;
                _this.setState({
                    phone: phone,
                    loginType: response.data.loginType
                });
            }  else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=100113');
            } else {
                alert(response.msg);
            }
        });
    }

    logout() {
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100221
        }).then(function(response) {
            //退出
            ws.post({
                url: '/api/login/logout'
            }).then(function(response) {
                if(response.code == 0) {
                    window.location.href = '/';
                } else {
                    alert(response.msg);
                }
            })
        });
    }

    onBindPhoneClick(event) {
        event.preventDefault();
        let {phone} = this.state;
        if(phone && phone.length > 0) {
            return false;
        } else {
            //页面跳转
            history.push('/personalCenter/phone?from=100113');
        }
    }

    render() {
        let {userId, phone, loginType} = this.state,
            showNickName = window.nickName && window.nickName.length > 0;
        return (
            <div className="personal-info">
                <div className="info-item info-portrait">
                    <div className="item-title">头像</div>
                    <div className="item-content-container">
                        <img className="header-img" src={window.avatarURL && window.avatarURL.length > 0 ? window.avatarURL : "/images/touxiang.png"} alt="个人头像"/>
                        <img src="/images/assistor.png" className="item-assistor"/>
                    </div>
                </div>
                <div className="info-item">
                    <div className="item-title">用户ID</div>
                    <div className="item-content-container">
                        <span className="item-content">{userId ? userId : ''}</span>
                        <img src="/images/assistor.png" className="item-assistor"/>
                    </div>
                </div>
                <div className="info-item" style={{display: showNickName ? 'block' : 'none'}}>
                    <div className="item-title">昵称</div>
                    <div className="item-content-container">
                        <span className="item-content">{showNickName ? window.nickName : ''}</span>
                        <img src="/images/assistor.png" className="item-assistor"/>
                    </div>
                </div>
                <div className="info-item">
                    <a href="javascript:void(0)" onClick={this.onBindPhoneClick}>
                        <div className="item-title">手机号</div>
                        <div className="item-content-container">
                            <span className="item-content">{phone && phone.length > 0 ? phone : '去绑定'}</span>
                            <img src="/images/assistor.png" className="item-assistor"/>
                        </div>
                    </a>
                </div>
                <div className="info-item">
                    <div className="item-title">第三方登录</div>
                    <div className="item-content-container">
                        <img className="login-type-item" src={loginType == 'QQ' ? "/images/qq1.png" : "/images/qq2.png"} alt=""/>
                        <img className="login-type-item"  src={(loginType == 'WeChat_web' || loginType == 'WeChat_Official_Account') ? "/images/wx1.png" : "/images/wx2.png"} alt=""/>
                        <img className="login-type-item"  src={loginType == 'Weibo' ? "/images/wb1.png" : "/images/wb2.png"} alt=""/>
                        <img src="/images/assistor.png" className="item-assistor"/>
                    </div>
                </div>
                <div className="exit" onClick={this.logout}>退出登录</div>
            </div>
        )
    }
}