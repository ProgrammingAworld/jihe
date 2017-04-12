import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            src:"/images/5yuan.png"
        }
    }
    render() {
        return (
            <div className="package">
                <div className="box">
                    <img src={this.state.src} alt=""/>
                </div>
            </div>
        )
    }
}