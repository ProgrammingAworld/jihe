import React from 'react';

export default class extends React.Component {

    render() {
        let {value} = this.props;
        let width = (value != null ? value : 0) * 100 + '%';
        return (
            <div className="progress">
                <div className="progress-bar" style={{width: width}}>
                </div>
            </div>
        )
    }
}