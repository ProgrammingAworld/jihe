import React from 'react';
import {Link} from 'react-router';
import {ws} from '../../lib/main.js';
import history from '../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onClickGame = this.onClickGame.bind(this);
        this.onClickGift = this.onClickGift.bind(this);
        this.onClickSheQu = this.onClickSheQu.bind(this);
        this.onClickGeRen = this.onClickGeRen.bind(this);
    }

    getClass(name, active) {
        let cls = name;
        if(name == active) {
            cls += ' active';
        }
        return cls;
    }

    getCurrentCode() {
        let active = this.props.active,
            currentCode;
        switch (active) {
            case 'libao':
                currentCode = 100105;
                break;
            case 'shequ':
                currentCode = 100106;
                break;
            case 'geren':
                currentCode = 100107;
                break;
            default:
                currentCode = 100101;
        }
        return currentCode;
    }

    onClickSheQu(event) {
        event.preventDefault();
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100223
        }).then(function(response) {
            //跳转到社区链接
            window.location.href = 'https://buluo.qq.com/p/barindex.html?bid=356108';
        });
    }

    onClickGame(event) {
        event.preventDefault();
        history.push('/?from=' + this.getCurrentCode());
    }

    onClickGift(event) {
        event.preventDefault();
        history.push('/gift?from=' + this.getCurrentCode());
    }

    onClickGeRen(event) {
        event.preventDefault();
        history.push('/personalCenter?from=' + this.getCurrentCode());
    }

    render() {
        let active = this.props.active;
        return (
            <footer className="footer">
                <a className={"menu "+this.getClass('youxi', active)} href={"/game?from=" + this.getCurrentCode()} onClick={this.onClickGame}>
                    <div className="menu-icon">
                        <span className="iconfont icon-youxi"></span>
                    </div>
                    <div className="menu-text">游戏</div>
                </a>
                <a className={"menu "+this.getClass('libao', active)} href={"/gift?from=" + this.getCurrentCode()} onClick={this.onClickGift}>
                    <div className="menu-icon">
                        <span className="iconfont icon-libaoc"></span>
                    </div>
                    <div className="menu-text">礼包</div>
                </a>
                <a className={"menu "+this.getClass('shequ', active)} onClick={this.onClickSheQu}
                   href="https://buluo.qq.com/p/barindex.html?bid=356108">
                    <div className="menu-icon">
                        <span className="iconfont icon-sqg"></span>
                    </div>
                    <div className="menu-text">社区</div>
                </a>
                <a className={"menu "+this.getClass('geren', active)} href={"/personalCenter?from=" + this.getCurrentCode()} onClick={this.onClickGeRen}>
                    <div className="menu-icon">
                        <span className="iconfont icon-geren01"></span>
                    </div>
                    <div className="menu-text">个人</div>
                </a>
            </footer>
        )

    }
}