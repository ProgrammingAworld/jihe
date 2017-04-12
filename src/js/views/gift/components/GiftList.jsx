import React from 'react';
import GiftItem from './GiftItem.jsx';
import InfiniteScroller from 'react-infinite-scroller';
import {ws} from '../../../lib/main.js';
import ScrollLoader from '../../common/ScrollLoader.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.loadMore = this.loadMore.bind(this);
        this.state = {
            datas: [],
            hasMore: true
        }
    }

    getItemViews(datas, openDialog, openCollarNumberDialog) {
        return _.map(datas, function(item) {
            var key = item.giftId ? item.giftId : _.uniqueId();
           return (
               <GiftItem openDialog={openDialog} data={item} key={key} openCollarNumberDialog={openCollarNumberDialog}/>
           )
        });
    }

    loadMore(page) {
        let _this = this;
        ws.get({
            url: '/api/gift',
            data: {
                page: page
            }
        }).then(function(response) {
            let datas = _this.state.datas,
                hasMore = false;
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
        let {openDialog, openCollarNumberDialog} = this.props;
        let {datas, hasMore} = this.state;
        let itemViews = this.getItemViews(datas, openDialog, openCollarNumberDialog);
        return (
            <InfiniteScroller className="gift-list"
                              pageStart={0}
                              loader={<ScrollLoader/>}
                              loadMore={this.loadMore}
                              useWindow={true}
                              hasMore={hasMore}>
                {itemViews}
            </InfiniteScroller>
        )
    }
}