import React from "react";
import history from '../../history.jsx';
import ws from '../../../lib/ws.js';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onOuterClick = this.onOuterClick.bind(this);
        this.save = this.save.bind(this);
        this.getItemViews = this.getItemViews.bind(this);
    }

    onOuterClick() {
        this.props.close();
    }

    onInnerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    save() {
        this.props.save();
        this.props.close();
    }

    getItemViews(datas) {
        let _this = this;
        return _.map(datas, function(item) {
            let key = item.gameKey ? item.gameKey : _.uniqueId();
            return (
                <a key={key} className="game-item" href={item.gameKey ? ('/game/' +  item.gameKey + '/launch') : 'javascript:void(0)'} onClick={_this.gameStart.bind(_this, item.gameKey)}>
                    <img className="item-icon" src={item.gameIcon ? item.gameIcon : undefined}/>
                    <div className="item-name">{item.gameName ? item.gameName : ''}</div>
                </a>
            )
        })
    }

    gameStart(id, event) {
        if(id == null) {
            return;
        }
        event.preventDefault();
        event.stopPropagation();
        //关闭弹窗;
        this.props.close();
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: id
            }
        });

        // 进入游戏
        history.replace('/game/' + id + '/launch');
    }

    onClickMoreGame(event) {
        event.preventDefault();
        event.stopPropagation();
        history.push('/game?from=100117');
    }

    render() {
        let {hide, leave, datas} = this.props;
        let display = hide ? 'none' : 'block';
        let itemViews = this.getItemViews(datas);
        return (
            <div className="modal exit-game-dialog" onClick={this.onOuterClick} style={{display: display}}>
                <div className="modal-dialog" onClick={this.onInnerClick}>
                    <div className="modal-header">
                        <span className="follow-title">更多游戏尽在“A站游戏”</span>
                        <img className="modal-close" src="/images/qx.png" onClick={this.props.close}/>
                    </div>
                    <div className="modal-body">
                        {itemViews}
                        <a className="game-item" href="/game" onClick={this.onClickMoreGame}>
                            <img className="item-icon" src="/images/touxiang.png"/>
                            <div className="item-name">更多游戏</div>
                        </a>
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-save" href="javascript:void(0)" onClick={this.save}>收藏我们</a>
                        <a className="btn btn-leave" href="javascript:void(0)" onClick={leave}>仍要离开</a>
                    </div>
                </div>
            </div>
        )
    }
}