import React from 'react';
import GameDetailGiftItem from './GameDetailGiftItem.jsx';
import InfiniteScroller from 'react-infinite-scroller';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            hasMore: true
        };
        this.loadMore = this.loadMore.bind(this);
    }

    getItemViews(datas, openDialog, openCollarNumberDialog) {
        return _.map(datas, function(item) {
            let key = item.giftId ? item.giftId : _.uniqueId();
            return (
                <GameDetailGiftItem key={key} data={item} openDialog={openDialog} openCollarNumberDialog={openCollarNumberDialog}/>
            )
        })
    }

    loadMore(page) {
        let _this = this,
            {datas, hasMore} = this.state,
            {gameId} = this.props;
        if(gameId == null) {
            return;
        }
        ws.get({
            url: '/api/gift/listByGame',
            data: {
                gameId: gameId,
                page: page
            }
        }).then(function(response) {
            let hasMore = false;
            if(response.code == 0) {
                let pagination = response.pagination;
                if(pagination) {
                    let pageNo = pagination.pageNo,
                        pageSize = pagination.pageSize,
                        total = pagination.size;
                    if(pageNo * pageSize < total) {
                        hasMore = true;
                    }
                }
               _this.setState({
                   datas: datas.concat(response.data),
                   hasMore: hasMore
               });
            } else {
                _this.setState({
                    hasMore: hasMore
                });
                alert(response.msg);
            }
        })
    }

    render() {
        let {datas, hasMore} = this.state;
        let {openDialog, openCollarNumberDialog} = this.props;
        let itemViews = this.getItemViews(datas, openDialog, openCollarNumberDialog);
        return (
            <div className="game-gift game-box">
                <div className="box-header">
                    <h2 className="header-title">游戏礼包</h2>
                </div>
                <InfiniteScroller className="box-body"
                                  pageStart={-1}
                                  loader={<div className="loader">加载中 ...</div>}
                                  loadMore={this.loadMore}
                                  useWindow={true}
                                  hasMore={hasMore}>
                    {itemViews}
                </InfiniteScroller>
            </div>
        )
    }
}