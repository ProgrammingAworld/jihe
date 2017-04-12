import React from 'react';
import history from '../../history.jsx';
import {ws} from '../../../lib/main.js';
import FormField from '../../FormField.jsx';

const MAX_COUNTDOWN = 60;

export default class extends React.Component {

    componentDidMount(){
        document.title = '绑定手机号';
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100108
        });
    }

    constructor(props) {
        super(props);
        this.state = {
            model: {},
            error: null,
            passwordType: 'password',
            isSendingCaptcha: false,
            hasSendCaptcha: false,
            countdown: MAX_COUNTDOWN,
            validate:{
                fir:true,
                liked:true,
                text:'点击获取',
                style:'',
                count:60,
                
            }
        };
        this.togglePasswordType = this.togglePasswordType.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.sendCaptcha = this.sendCaptcha.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    togglePasswordType() {
        let {passwordType} = this.state;
        if(passwordType =='password'){
            this.setState({
                passwordType: 'text'
            });
        }else {
            this.setState({
                passwordType: 'password'
            });
        }
    }

    sendCaptcha() {
        let {model, isSendingCaptcha, countdown} = this.state,
            {phone} = model,
            _this = this;
        _this.setState({
            error: ''
        });
        if(phone == null || phone == ''|| !/^1(3[0-9]|4[57]|5[0-35-9]|7[0135678]|8[0-9])\d{8}$/i.test(phone)) {
            _this.setState({
                error: '请输入正确的手机号码'
            });
            return;
        }
        if(!isSendingCaptcha && countdown == MAX_COUNTDOWN) {
            ws.get({
                url: '/api/system/sendCaptcha',
                data: {
                    phone: phone
                }
            }).then(function(response) {
                _this.setState({
                    isSendingCaptcha: false
                });
                if(response.code == 0) {
                    _this.setState({
                        hasSendCaptcha: true
                    });
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
                isSendingCaptcha: true
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
        } else {
            error = null;
        }
        return error;
    }

    onSubmit() {
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
            currentCode: 100219,
            data: {
                currentUrl: window.location.href,
                timestamp: new Date().getTime()
            }
        });

        //绑定手机号
        ws.post({
            url: '/api/user/bindPhone',
            data: model
        }).then(function(response) {
            if(response.code == 0) {
                history.push('/personalCenter/info');
            } else {
                _this.setState({
                    error: response.msg
                });
            }
        });
    }

    onChangeField(field) {
        return function(value) {
            let {model} = this.state;
            model[field] = value;
            this.setState({
                model: model
            })
        }
    }

    render() {
        let {model, error, passwordType, countdown} = this.state;
        let passwordAddonImg,
            passwordAddonAlt;
        if(passwordType == 'password') {
            passwordAddonImg = '/images/eye-close.png';
            passwordAddonAlt = '显示密码';
        } else {
            passwordAddonImg = '/images/eye-open.png';
            passwordAddonAlt = '隐藏密码';
        }
        return (
            <div className="phonebinding">
                <div className="row">
                    <div className="title">手机号</div>
                    <div className="content">
                        <FormField.Input type="text" placeholder="请输入您的手机号" value={model.phone} onChange={this.onChangeField("phone").bind(this)}/>
                    </div>
                </div>
                <div className="row">
                    <div className="title">密码</div>
                    <div className="content">
                        <FormField.Input type={passwordType} placeholder="6-16位字母/数字" value={model.password} onChange={this.onChangeField('password').bind(this)}/>
                        <div className="eye" onClick={this.togglePasswordType}>
                            <img src={passwordAddonImg} alt={passwordAddonAlt}/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="title">确认密码</div>
                    <div className="content">
                        <FormField.Input type={passwordType} placeholder="请再次输入密码" value={model.passwordAgain} onChange={this.onChangeField("passwordAgain").bind(this)}/>
                    </div>
                </div>
                <div className="row2">
                    <div className="title">验证码</div>
                    <div className="content">
                        <FormField.Input className="captcha-input" placeholder="请输入验证码" value={model.captcha}
                                         onChange={this.onChangeField('captcha').bind(this)}/>
                        <div className={'clickbutton ' + (countdown < MAX_COUNTDOWN ? ' clicked' : '')} onClick={this.sendCaptcha}>{countdown == MAX_COUNTDOWN ? '点击获取' : (countdown + '秒')}</div>
                    </div>
                </div>
                <div className="form-errors" style={{display: error == null || error == '' ? 'none' : 'block'}}>
                    <div className="form-error">
                        {error ? error : ''}
                    </div>
                </div>
                <div className="binding" onClick={this.onSubmit}>
                    确认绑定
                </div>
            </div>
        )
    }
}