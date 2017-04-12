import React from 'react';
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';
import FollowWexinDialog from '../../common/FollowWexinDialog.jsx';
import ExitGameDialog from './ExitGameDialog.jsx';

export default class extends React.Component {

    componentDidMount() {
        document.title = '游戏启动';
        let _this = this;
        let {params} = this.props,
            {id, from} = params;
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: id
            }
        });
        //获取游戏链接并在iframe加载
        ws.post({
            url: '/api/game/' + id + '/launch'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=' + from);
            } else {
                alert(response.msg);
            }
        });
    }


    render() {
        return (
            <div></div>
        )
    }
}