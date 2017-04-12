import React from 'react';
import Card from '../components/Card.jsx'

export default class extends React.Component {

    componentWillMount(){
        document.title = '我收集的卡片';
    }

    render() {
        return (
            <div className="chrismas">
                <div className="header">
                    <img src="/images/chrismas_1.png" alt=""/>
                </div>
                <Card/>
                <div className="anniu">
                    <a href="">我要兑换</a>
                </div>
                <div className="guize"><img src="/images/chrismas_4.png" alt=""/></div>
                <div className="fengexian">
                    <img src="/images/chrismas_5.png" alt=""/>
                </div>
                <div className="weixinqun">
                    <img src="/images/chrismas_6.png" alt=""/>
                </div>
                <div className="erweima">
                    <img src="/images/ewm.gif" alt=""/>
                </div>
                <div className="footer">
                    <img src="/images/chrismas_8.png" alt=""/>
                </div>
            </div>
        )
    }

}