import React from 'react';
import InfiniteScroller from 'react-infinite-scroller';
import {ws} from '../../../lib/main.js';
import ScrollLoader from '../../common/ScrollLoader.jsx';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            datas: [],
            hasMore: true
        }
    }

    gotoGame(id) {
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: id
            }
        });

        // 进入游戏
        ws.post({
            url: '/api/game/' + id + '/launch'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=' + 100107);
            } else {
                alert(response.msg);
            }
        });
    }

    getItemViews(datas) {
        let _this = this;
        return _.map(datas, function (item) {
            let {gameId, gameName, gameIcon, lastLaunchTime} = item,
                key = gameId ? gameId : _.uniqueId();
            return (
                <div className="games-item" key={key}>
                    <a href="javascript:void(0)" onClick={_this.gotoGame.bind(_this, gameId)}>
                        <div className="games-icon"><img src={gameIcon} alt={gameName} width="100%" height="100%"/></div>
                        <div className="games-info">
                            <div className="game-name">
                                {gameName}
                            </div>
                            <div className="last-login">
                                上次登录时间：{lastLaunchTime}
                            </div>
                        </div>
                    </a>
                </div>
            )
        })
    }

    loadMore(page) {
        let _this = this,
            {datas} = this.state;
        ws.get({
            url: '/api/user/games',
            data: {
                page: page
            }
        }).then(function(response) {
            if(response.code == 0) {
                datas = _.concat(datas, response.data);
                _this.setState({
                    datas: datas,
                    hasMore: false
                });
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=100107');
            } else {
                alert(response.msg);
            }
        })
    }

    render() {
        let {datas} = this.state;
        let itemViews = this.getItemViews(datas);
        return (
            <div className="mygames">
                <h1>我的游戏</h1>
                <InfiniteScroller className="games"
                                  pageStart={0}
                                  loader={<ScrollLoader/>}
                                  loadMore={this.loadMore}
                                  useWindow={true}
                                  hasMore={this.state.hasMore}>
                    {itemViews}
                </InfiniteScroller>
            </div>
        )
    }
}