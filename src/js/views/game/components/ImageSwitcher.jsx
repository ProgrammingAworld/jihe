import React from 'react';
import ReactSwipe from 'react-swipe';
import {ws} from '../../../lib/main.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            datas: []
        }
        this.getSwipeOptions = this.getSwipeOptions.bind(this);
    }

    componentDidMount() {
        let _this = this;
        //获取轮播图数据
        ws.get({
            url: '/api/slideImg'
        }).then(function(response) {
            if(response.code == 0) {
                _this.setState({
                    datas: response.data
                });
            } else {
                alert(response.msg);
            }
        })
    }

    getSwitcherItemViews(datas, activeIndex) {
        return _.map(datas, function(item, index) {
            item = item ? item : {};
            let key = item.id ? item.id : _.uniqueId();
            let itemClass = 'carousel-switcher-item' + (index === activeIndex ? ' active' : '');
            return (
                <li key={key}>
                    <i className={itemClass}></i>
                </li>
            )
        })
    }

    getItemViews(datas) {
        return _.map(datas, function(item) {
            let key = item.id ? item.id : _.uniqueId();
            let imgClass = 'carousel-img-item' + (item.imgUrl ? '' : ' unknow');
            function imgRedirect() {
                //保存埋点信息
                ws.event({
                    typeCode: 1002,
                    currentCode: 100208,
                    data: {
                        id: item.id,
                        targetUrl: item.redirectUrl,
                        currentUrl: window.location.href,
                        timestamp: new Date().getTime()
                    }
                }).then(function(response) {
                    //页面跳转
                    window.location.href = item.redirectUrl;
                });

            }
            return (
                <img key={key} src={item.imgUrl} className={imgClass} alt={item.name} onClick={imgRedirect}/>
            );
        })
    }

    getSwipeOptions() {
        let _this = this,
            {datas} = this.state;
        return {
            continuous: false,
            auto: 3000,
            callback(index, elem) {
                let item = datas[index];
                //保存埋点信息
                ws.post({
                    url: '/api/event',
                    data: {
                        typeCode: 1002,
                        currentCode: 100208,
                        data: {
                            id: item.id,
                            targetUrl: item.redirectUrl,
                            currentUrl: window.location.href,
                            timestamp: new Date().getTime()
                        }
                    }
                });
                _this.setState({
                    activeIndex: index
                });
            }
        };
    }

    render() {
        let {datas} = this.state;
        datas = datas ? datas : new Array(1); /* 默认5条数据，防止ReactSwipe初始数据为空，导致的宽高问题*/
        let {activeIndex} = this.state;
        let switcherViews = this.getSwitcherItemViews(datas, activeIndex);
        return (
            <div className="switcher-container">
                {datas && datas.length > 0 ?
                <ReactSwipe swipeOptions={this.getSwipeOptions()}>
                    {this.getItemViews(datas)}
                </ReactSwipe>
                    : <div/>
                }
                <ul className="switcher-zone">{switcherViews}</ul>
            </div>
        )
    }
}