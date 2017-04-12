import React from 'react';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggleExpand = this.toggleExpand.bind(this);
    }

    toggleExpand() {
        let expanded = this.state.expanded;
        this.setState({
            expanded: !expanded
        });
    }

    getBodyView(content, expanded) {
        const MAX_LENGTH = 80;
        let view,
            toggleName = expanded ? '   收起' : '...全文';
        if(content && content.length > MAX_LENGTH) {
            let _content = expanded ? content : content.substring(0, MAX_LENGTH);
            view = (
                <div className="box-body">
                    <span>{_content}</span>
                    <a className="btn-expand-toggle" href="javascript:void(0)" onClick={this.toggleExpand}>{toggleName}</a>
                </div>
            )
        } else {
            view = (
                <div className="box-body">
                    {content}
                </div>
            )
        }
        return view;
    }

    render() {
        let {expanded} = this.state;
        let {data} = this.props;
        data = data ? data : '';
        let bodyView = this.getBodyView(data, expanded);
        return (
            <div className="game-description game-box">
                <div className="box-header">
                    <h2 className="header-title">游戏简介</h2>
                </div>
                {bodyView}
            </div>
        )
    }
}