import React from "react";

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onOuterClick = this.onOuterClick.bind(this);
    }

    onOuterClick() {
        this.props.close();
    }

    onInnerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {
        let {hide} = this.props;
        let display = hide ? 'none' : 'block';
        return (
            <div className="modal follow-weixin-dialog" onClick={this.onOuterClick} style={{display: display}}>
                <div className="modal-dialog" onClick={this.onInnerClick}>
                    <div className="modal-header">
                        <span className="follow-title">关注 “A站游戏”</span>
                    </div>
                    <div className="modal-body">
                        <img src="/images/erweima.jpg" alt="A站游戏" className="follow-img"/>
                    </div>
                    <div className="modal-footer">
                        <div className="follow-info">长按识别二维码</div>
                    </div>
                </div>
            </div>
        )
    }
}