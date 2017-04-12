import React from 'react';
import Turntable from '../components/Turntable.jsx'

export default class extends React.Component {

    componentWillMount(){
        document.title = '疯狂大转盘游戏';
    }

    render() {
        return (
            <div className="turntablegame">
                <div className="header"></div>
                <Turntable/>
                <div className="shuoming"></div>
                <div className="fgx"></div>
                <div className="ewm"><img src="/images/ewm2.gif" alt=""/></div>
            </div>
        )
    }

}