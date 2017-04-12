import React from 'react';
import GameServerItem from './GameServerItem.jsx';
import {ws} from '../../lib/main.js';
import InfiniteScroller from 'react-infinite-scroller';
import ScrollLoader from './ScrollLoader.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            datas: [],
            hasMore: true
        }
    }

    getItemViews(datas)  {
        return _.map(datas, function(item) {
            let key = item.serverKey ? item.serverKey : _.uniqueId();
            return (
                <GameServerItem key={key} data={item}/>
            );
        });
    }

    loadMore(page) {
        let _this = this,
            {url} = this.props,
            {datas} = this.state;
        ws.get({
            url: url,
            data: {
                page: page
            }
        }).then(function(response) {
            let hasMore = false;
            if(response.code == 0) {
                datas = _.concat(datas, response.data);
                if(response.pagination) {
                    let pagination = response.pagination,
                        pageNo = pagination.pageNo,
                        pageSize = pagination.pageSize,
                        total = pagination.total;
                    if(pageNo * pageSize < total) {
                        hasMore = true;
                    }
                }
                _this.setState({
                    datas: datas,
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
        let {datas} = this.state;
        let itemViews = this.getItemViews(datas);
        return (
            <InfiniteScroller className="game-new-zone-container"
                              pageStart={0}
                              loader={<ScrollLoader/>}
                              loadMore={this.loadMore}
                              useWindow={true}
                              hasMore={this.state.hasMore}>
                {itemViews}
            </InfiniteScroller>
        )
    }
}