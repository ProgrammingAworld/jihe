import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.onOurterClick = this.onOurterClick.bind(this);
    }

    onOurterClick() {
        this.props.close();
    }

    onInnerClick(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    }

    render() {
        let {children, hide, close} = this.props;
        let display = hide ? "none" : "block";
        return (
            <div className="modal gift-more-dialog" style={{display: display}} onClick={this.onOurterClick}>
                <div className="modal-dialog" onClick={this.onInnerClick}>
                    <div className="modal-content">
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <a className="btn btn-confirm" onClick={close} href="javascript:void(0)">确定</a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}