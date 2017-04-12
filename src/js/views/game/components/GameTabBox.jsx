import React from 'react';
import GameList from './GameList.jsx';
import GameInfoList from './GameInfoList.jsx';
import GameServerList from '../../common/GameServerList.jsx';
import ReactSwipe from 'react-swipe';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0
        }
    }

    getTabClass(idx, activeIndex) {
        let cls = 'game-tab-item';
        if (idx == activeIndex) {
            cls += ' active';
        }
        return cls;
    }

    onTabClick(index) {
        //保存埋点信息
        var currentCode;
        switch (index) {
            case 1:
                currentCode = 100210;
                break;
            case 2:
                currentCode = 100211;
                break;
            case 3:
                currentCode = 100212;
                break;
            default:
                currentCode = 100209;
        }
        //保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: currentCode,
            data: {
                eventType: 'click'
            }
        });

        //Tab页滑动
        this.refs.swipe.slide(index);
    }

    render() {
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
        const SWIPE_MIN_HEIGHT = '350px'; /*最低高度，可供用户滑动*/
        return (
            <div className="game-tab-box">
                <div className="game-tab">
                    <ul className="game-tab-container">
                        <li className={this.getTabClass(0, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 0)}>热门</span>
                        </li>
                        <li className={this.getTabClass(1, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 1)}>新上架</span>
                        </li>
                        <li className={this.getTabClass(2, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 2)}>资讯</span>
                        </li>
                        <li className={this.getTabClass(3, activeIndex)}>
                            <span onClick={this.onTabClick.bind(this, 3)}>新开服</span>
                        </li>
                    </ul>
                </div>
                <div className="game-box">
                    <ReactSwipe swipeOptions={swipeOptions} ref="swipe">
                        <div style={{height: activeIndex == 0 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameList url="/api/game/hot"/>
                        </div>
                        <div style={{height: activeIndex == 1 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameList url="/api/game/new"/>
                        </div>
                        <div style={{height: activeIndex == 2 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameInfoList/>
                        </div>
                        <div style={{height: activeIndex == 3 ? 'auto' : SWIPE_MIN_HEIGHT, overflow: 'hidden'}}>
                            <GameServerList url="/api/gameServer/listToday"/>
                        </div>
                    </ReactSwipe>
                </div>
            </div>
        )
    }

}