import React from 'react';

export default class extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            times:2,
            rotate:{transform: 'rotate(0deg)'}
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        var //剩余抽奖次数
            time = 1,
            //这一次抽奖结果
            result=7,
            //随机转几圈
            number = GetRandomNum(3,8),
            //中奖结果
            //1.2元微信红包
            //2.5元微信红包
            //3.游戏大礼包
            //4.8元微信红包
            //5.20元微信红包
            //6.100元微信红包
            //7.2元微信红包
            //结果角度数
            rotate=0;
        if(this.state.times<=0)
        {
            return;
        }
        rotate=GetRotate(result)+number*360;
        this.setState({
            times:time,
            rotate:{transform:'rotate('+rotate+'deg)'}
        });
        function GetRotate(result){
            var rotate=1;
            switch (result){
                case 1 : return 60;
                case 2 : return 110;
                case 3 : return 160;
                case 4 : return 210;
                case 5 : return 260;
                case 6 : return 310;
                case 7 : return 0;
            }
        }
        function GetRandomNum(Min,Max){
            var Range = Max - Min;
            var Rand = Math.random();
            return(Min + Math.round(Rand * Range));
        }
    }

    render() {
        return (
            <div className="turntable">
                <div className="time"><span>{this.state.times}</span></div>
                <div className="turntable-bg">
                    <div className="pointer" onClick={this.handleClick}><img src="../images/zhen.png" alt="pointer" /></div>
                    <div className="rotate"><img id="rotate" src="../images/zhanpan.png" alt="turntable" style={this.state.rotate}/></div>
                    <div className="xuehua"><img src="../images/xuehua.png" alt=""/></div>
                </div>
            </div>
        )
    }
}