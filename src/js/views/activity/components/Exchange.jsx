import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            src:"/images/exchange-failure.png"
        }
    }
    render() {
        return (
            <div className="exchange">
                <div className="box">
                    <img src={this.state.src} alt=""/>
                </div>
            </div>
        )
    }
}