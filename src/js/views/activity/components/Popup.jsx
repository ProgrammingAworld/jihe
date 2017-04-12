import React from 'react';
import {Link} from 'react-router';

export default class extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.datas == null || props.datas.length === 0 ? false : true
        }
    }

    open() {
        this.setState({
            isOpen: true
        });
    }

    close() {
        this.setState({
            isOpen: false
        })
    }

    getShowImg(type) {
        let imgSrc;
        switch (type) {
            case 2:
                imgSrc = '/images/qiub.png';
                break;
            case 3:
                imgSrc = '/images/youb.png';
                break;
            case 4:
                imgSrc = '/images/xib.png';
                break;
            default:
                imgSrc = '/images/xueb.png';
        }
        return imgSrc;
    }

    render() {
        let {datas} = this.props,
            totalNum,
            firstType;
        if(datas == null || datas.length === 0) {
            totalNum = 0;
            firstType = 1;
        } else {
            totalNum = datas.length;
            firstType = datas[0].code;
        }
        return (
            <div className="popup" style={{display: this.state.isOpen ? 'block' : 'none'}}>
                <div className="box">
                    <div className="header">
                        <a href="javascript" onClick={this.close}><img src="/images/tcqx.png" alt="关闭"/></a>
                    </div>
                    <div className="content">
                        <div className="fontimg">
                            <img src={this.getShowImg(firstType)} alt="集字"/>
                        </div>
                        <div className="button">
                            <Link to="/activity/christmas">全部领取<span>x</span><span>{totalNum}</span></Link>
                        </div>
                        <div className="shuoming">集齐"A站游戏"，兑换百元现金红包</div>
                    </div>
                </div>
            </div>
        )
    }
}