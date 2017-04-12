import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onOurterClick = this.onOurterClick.bind(this);
    }

    onOurterClick() {
        //this.props.close();
    }

    onInnerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {
        let {children, hide, close, header, explain} = this.props;
        let display = hide ? "none" : "block";
        return (
            <div className="modal collar-number-dialog" style={{display: display}} onClick={this.onOurterClick}>
                <div className="modal-dialog" onClick={this.onInnerClick}>
                    <div className="modal-header">
                        <div className="follow-title">{header}</div>
                    </div>
                    <div className="modal-content">
                        <div className="modal-body">
                            <div className="CollarNumber">
                                {children}
                            </div>
                            <div className="shuoming">
                                {explain}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <a className="btn btn-cancel" onClick={close} href="javascript:void(0)">取消</a>
                            <a className="btn btn-confirm" onClick={close} href="javascript:void(0)">确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}