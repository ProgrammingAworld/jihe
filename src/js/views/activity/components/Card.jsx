import React from 'react';

export default class extends React.Component{

    render() {
        return (
            <div className="card">
                <div className="cardimg xue">
                    <img src="/images/xueh.png" alt="A"/>
                    <div className="number">99</div>
                </div>
                <div className="cardimg qiu">
                    <img src="/images/qiug.png" alt="站"/>
                    <div className="number">1</div>
                </div>
                <div className="cardimg you">
                    <img src="/images/youh.png" alt="游"/>
                    <div className="number">1</div>
                </div>
                <div className="cardimg xi">
                    <img src="/images/xih.png" alt="戏"/>
                    <div className="number">1</div>
                </div>
            </div>
        )
    }
}