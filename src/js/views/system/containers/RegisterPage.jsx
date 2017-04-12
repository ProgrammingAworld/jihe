import React from 'react';
import Logo from '../components/Logo.jsx';
import FormField from '../../FormField.jsx';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

const MAX_COUNTDOWN = 60;

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onRegister = this.onRegister.bind(this);
        this.togglePasswordType = this.togglePasswordType.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.sendCaptcha = this.sendCaptcha.bind(this);
        this.state = {
            model: {
                loginType: 1
            },
            error: null,
            passwordType: 'password',
            hasSendCaptcha: false,
            countdown: MAX_COUNTDOWN
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


    componentWillMount(){
        document.title = '注册';
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100104
        });
    }

    sendCaptcha() {
        let {model, hasSendCaptcha, countdown} = this.state,
            {phone} = model,
            _this = this;
        //保存埋点信息
        ws.post({
            url: '/api/event',
            data: {
                typeCode: 1002,
                currentCode: 100206,
                data: {
                    currentUrl: window.location.href,
                    timestamp: new Date().getTime()
                }
            }
        });

        _this.setState({
            error: ''
        });
        if(phone == null || phone == ''|| !/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/i.test(phone)) {
            _this.setState({
                error: '请输入正确的手机号码'
            });
            return;
        }
        if(!hasSendCaptcha && countdown == MAX_COUNTDOWN) {
            //获取手机验证码
            ws.get({
                url: '/api/system/sendCaptcha',
                data: {
                    phone: phone
                }
            }).then(function(response) {
                _this.setState({
                    hasSendCaptcha: false
                });
                if(response.code == 0) {

                } else {
                    switch (response.code) {
                        case 100001:
                            _this.setState({
                                error: '请输入正确的手机号码'
                            });
                            break;
                        default:
                            _this.setState({
                                error: response.msg
                            });
                    }
                }
            });
            this.setState({
                hasSendCaptcha: true
            });
            this.startTimer();
        }

    }

    startTimer() {
        let _this = this,
            {countdown} = this.state;
        window.setTimeout(function() {
            countdown = countdown - 1;
            if(countdown == 0) {
                countdown = MAX_COUNTDOWN;
            }
            _this.setState({
                countdown: countdown
            });
            if(countdown < MAX_COUNTDOWN) {
                _this.startTimer(countdown);
            }
        }, 1000);
    }

    togglePasswordType() {
        let {passwordType} = this.state;
        passwordType = passwordType == 'password' ? 'text' : 'password';
        this.setState({
            passwordType: passwordType
        });
    }

    validate(model) {
        let error;
        if(model.phone == null || model.phone.length === 0 || !/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/i.test(model.phone)) {
            error = '请输入正确的手机号码';
        } else if(model.password == null || model.password == '' || !/^[a-zA-Z0-9]{6,16}$/.test(model.password)) {
            error = "请输入6-16位字母或数字的密码";
        } else if(model.passwordAgain == null) {
            error = "请输入确认密码";
        } else if(model.passwordAgain != model.password) {
            error = "两次输入的密码不一致";
        } else if(model.captcha == null) {
            error = "请输入验证码";
        } else if(model.agree != true) {
            error = "请确认用户协议";
        } else {
            error = null;
        }
        return error;
    }

    onRegister() {
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
            currentCode: 100205
        });

        //注册
        ws.post({
            url: '/api/register',
            data: model
        }).then(function(response) {
            if(response.code == 0) {
                let data = response.data;
                window.userId = data.id;
                window.phone = data.phone;
                window.loginType = data.loginInfo ? data.loginInfo.providerID : null;
                window.rewardPoints = data.rewardPoints;
                history.push('/?from=100104');
            } else {
                _this.setState({
                    error: response.msg
                });
            }
        })
    }

    render() {
        let {model, error, passwordType, countdown} = this.state,
            passwordAddonImg,
            passwordAddonAlt;
        if(passwordType == 'password') {
            passwordAddonImg = '/images/eye-close.png';
            passwordAddonAlt = '显示密码';
        } else {
            passwordAddonImg = '/images/eye-open.png';
            passwordAddonAlt = '隐藏密码';
        }
        error = error ? error : '';
        return (
            <div className="registerbody">
                <Logo/>
                <div className="register-form">
                    <div className="form-item">
                        <label>手机号</label>
                        <FormField.Input value={model.phone} onChange={this.onChangeFiled('phone').bind(this)} placeholder="请输入您的手机号"/>
                    </div>
                    <div className="line"></div>
                    <div className="form-item">
                        <label>密码</label>
                        <FormField.Input type={passwordType} value={model.password} onChange={this.onChangeFiled('password').bind(this)} placeholder="6-16位字母/数字"/>
                        <span className="eye" onClick={this.togglePasswordType}>
                            <img src={passwordAddonImg} alt={passwordAddonAlt}/>
                        </span>
                    </div>
                    <div className="line"></div>
                    <div className="form-item">
                        <label>确认密码</label>
                        <FormField.Input type={passwordType} value={model.passwordAgain} onChange={this.onChangeFiled('passwordAgain').bind(this)} placeholder="请再次输入密码"/>
                    </div>
                    <div className="line2"></div>
                    <div className="form-item">
                        <label>验证码</label>
                        <FormField.Input value={model.captcha} onChange={this.onChangeFiled('captcha').bind(this)} placeholder="请输入验证码"/>
                        <div className='clickbutton ' onClick={this.sendCaptcha}>{countdown == MAX_COUNTDOWN ? '点击获取' : (countdown + '秒')}</div>
                    </div>
                    <div className="form-agree">
                        <FormField.Checkbox value={model.agree} onChange={this.onChangeFiled('agree').bind(this)}/>同意A站游戏用户协议
                    </div>
                    <div className="form-errors">
                        <div className="form-error" style={{display: error == '' ? 'none' : 'block'}}>
                            {error ? error : ''}
                        </div>
                    </div>
                    <div className="login-btn">
                        <a href="javascript:void(0)" className="register" onClick={this.onRegister}>注册</a>
                    </div>
                </div>
            </div>
        )
    }

}
