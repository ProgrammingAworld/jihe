import React from 'react';
import GiftList from './GiftList.jsx';
import ReactSwipe from 'react-swipe';
import GameServerList from '../../common/GameServerList.jsx';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    getTabClass(idx, activeIndex) {
        let cls = 'gift-tab-item';
        if(idx == activeIndex) {
            cls += ' active';
        }
        return cls;
    }

    onTabClick(index) {
        //保存埋点信息
        let currentCode;
        switch (index) {
            case 1:
                currentCode = 100216;
                break;
            case 2:
                currentCode = 100217;
                break;
            default:
                currentCode =100215;
        }
        ws.event({
            typeCode: 1002,
            currentCode: currentCode,
            data: {
                timestamp: new Date().getTime()
            }
        });

        //Tab页滑动
        this.refs.swipe.slide(index);
    }

    render() {
        let {openDialog, openCollarNumberDialog} = this.props;
        let activeIndex = this.state.activeIndex;
        let _this = this;
        let swipeOptions = {
            continuous: false,
            callback: function(index, elem) {
                _this.setState({
                    activeIndex: index
                });
            }
        };
        const SWIPE_MIN_HEIGHT = '500px'; /*最低高度，可供用户滑动*/
        return (
            <div className="gift-tab-box">
                <div className="gift-tab">
                    <ul className="gift-tab-container">
                        <li className={this.getTabClass(0, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 0)}>礼包列表</span>
                        </li>
                        <li className={this.getTabClass(1, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 1)}>今日开服</span>
                        </li>
                        <li className={this.getTabClass(2, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 2)}>未来一周</span>
                        </li>
                    </ul>
                </div>
                <div className="game-box">
                    <ReactSwipe swipeOptions={swipeOptions} ref="swipe">
                        <div style={{height: activeIndex == 0 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GiftList openDialog={openDialog} openCollarNumberDialog={openCollarNumberDialog}/>
                        </div>
                        <div style={{height: activeIndex == 1 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameServerList url="/api/gameServer/listToday"/>
                        </div>
                        <div style={{height: activeIndex == 2 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameServerList url="/api/gameServer/listNextWeek"/>
                        </div>
                    </ReactSwipe>
                </div>
            </div>
        )
    }
}