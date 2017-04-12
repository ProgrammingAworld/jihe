import React from 'react';
import {Link} from 'react-router';
import Logo from '../components/Logo.jsx';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onLogin = this.onLogin.bind(this);
        this.state = {
            model: {
                loginType: 1
            },
            error: null,
            passwordType: 'password'
        }
    }

    onChangeFiled(field) {
        return function(value) {
            let {model} = this.state;
            model[field] = value;
            this.setState({
                model: model
            });
        }
    }

    componentDidMount(){
        document.title = '登录';
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100103
        });
    }

    validate(model) {
        let error;
        if(model.name == null || model.name.length === 0) {
            error = '请输入手机号';
        } else if(model.password == null || model.password.length === 0) {
            error = "请输入密码";
        } else {
            error = null;
        }
        return error;
    }

    onLogin() {
        let _this = this,
            {model} = this.state,
            error = this.validate(model);
        this.setState({
            error: error
        });
        if(error != null) {
            return;
        }
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100201
        });

        //登录
        ws.post({
            url: '/api/login',
            data: model
        }).then(function(response) {
            if(response.code == 0) {
                let data = response.data;
                window.userId = data.id;
                window.phone = data.phone;
                window.loginType = data.loginInfo ? data.loginInfo.providerID : null;
                window.rewardPoints = data.rewardPoints;
                history.push('/');
            } else {
                _this.setState({
                    error: response.msg
                });
            }
        })
    }

    onWxLogin() {
        var isMobileWx = /MicroMessenger/i.test(window.navigator.userAgent) && /Mobile/i.test(window.navigator.userAgent);
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100203
        });

        //微信登录
        ws.post({
            url: '/api/login/wx?isMobileWx=' + isMobileWx
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
            } else {
                alert(response.msg);
            }
        })
    }

    onQQLogin() {
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100202
        });

        //qq登录
        ws.post({
            url: '/api/login/qq'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
                // console.log(response.data);
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {model, error} = this.state,
            isMobileButNotWx = /Mobile/i.test(window.navigator.userAgent) && !/MicroMessenger/i.test(window.navigator.userAgent);
        return (
            <div className="loginbody">
                <Logo/>
                <div className="login-form">
                    <div className="form-item">
                        <label>手机号</label>
                        <FormField.Input type="text" value={model.name}
                                         onChange={this.onChangeFiled('name').bind(this)}
                                         placeholder="请输入您的手机号"/>
                    </div>
                    <div className="line"></div>
                    <div className="form-item">
                        <label>密码</label>
                        <FormField.Input type="password" value={model.password}
                                         onChange={this.onChangeFiled('password').bind(this)}
                                         placeholder="请输入密码"/>
                        <a href="javascript:void(0)" className="button" style={{display: 'none'}}>
                            <img src="/images/qx.png" alt=""/>
                        </a>
                    </div>

                    <div className="form-errors">
                        <div className="form-error" style={{display: (error && error != '' ? 'block' : 'none')}}>
                            {error ? error : ''}
                        </div>
                    </div>
                    <div className="login-btn">
                        <a href="javascript:void(0)" className="denglu" onClick={this.onLogin}>登录</a>
                    </div>
                </div>
                <div className="register-info">
                    <Link to="/register?from=100103">没有账号，去注册？</Link>
                </div>
                <div className="login-thirdparty">
                    <div className="login-thirdparty-title"><span>第三方登录</span></div>
                    <div className="login-thirdparty-btn">
                        <a className="btn-thirdparty btn-qq" href="javascript:void(0)" onClick={this.onQQLogin}>
                            <img src="images/lqq.png"/>
                            <span>QQ</span>
                        </a>
                        <a className="btn-thirdparty btn-weixin" href="javascript:void(0)"
                           style={isMobileButNotWx ? {display: 'none'} : undefined}
                           onClick={this.onWxLogin}>
                            <img src="images/lwx.png"/>
                            <span>微信</span>
                        </a>
                        <a className="btn-thirdparty btn-weibo" href="javascript:void(0)" style={{display: 'none'}}>
                            <img src="images/lwb.png"/>
                            <span>微博</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    }

}
