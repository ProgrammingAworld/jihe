import React from 'react';
import PersonalShortHeader from '../../common/PersonalShortHeader.jsx';
import ImageSwitcher from "../components/ImageSwitcher.jsx";
import RecentGameList from '../components/RecentGameList.jsx';
import GameTabBox from '../components/GameTabBox.jsx';
import {ws} from '../../../lib/main.js';
import App from '../../common/App.jsx';
import ActivityPopup from '../../activity/components/Popup.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            activityCollectionDatas: []
        }
    }

    componentDidMount(){
        document.title = 'A站游戏-游戏中心';
        let _this = this;
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100101
        });
        /*
        //获取集字活动数据
        if(!window.hasPopup && window.userId && window.userId.length > 0) {
            window.hasPopup = true;
            ws.post({
                url: '/api/activity/collection'
            }).then(function(response) {
                if(response.code == 0) {
                    _this.setState({
                        activityCollectionDatas: response.data
                    })
                } else {
                    alert(response.msg);
                }
            })
        }
        */
    }

    render() {
        let {activityCollectionDatas} = this.state;
        return (
            <App active="youxi">
                <div>
                    <PersonalShortHeader/>
                    <ImageSwitcher/>
                    {window.userId && window.userId.length > 0 ? <RecentGameList/> : <div/>}
                    <GameTabBox/>
                    <ActivityPopup datas={activityCollectionDatas}/>
                </div>
            </App>
        )
    }

}