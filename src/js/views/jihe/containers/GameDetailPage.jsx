import React from 'react';
import GameDetailScreenshotBox from '../components/GameDetailScreenshotBox.jsx';
import GameDetailDescriptionBox from '../components/GameDetailDescriptionBox.jsx';
import GameDetailGiftBox from '../components/GameDetailGiftBox.jsx';
import GiftMoreDialog from "../../gift/components/GiftMoreDialog.jsx";
import CollarNumberDialog from "../../gift/components/CollarNumberDialog.jsx";
import {ws} from '../../../lib/main.js';
import history from '../../history.jsx';

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: {},
            moreDialog: {
                hide: true,
                content: ''
            },
            collarNumberDialog: {
                hide: true,
                content: '',
                header: '',
                explain: ''
            }
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.openCollarNumberDialog = this.openCollarNumberDialog.bind(this);
        this.closeCollarNumberDialog = this.closeCollarNumberDialog.bind(this);
        this.gotoGameEnter = this.gotoGameEnter.bind(this);
    }

    componentDidMount(){
        document.title = 'A站游戏-游戏详情';
        let {params} = this.props,
            id = params.id,
            _this = this;
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100102,
            data: {
                id: id
            }
        });

        //获取游戏信息
        ws.get({
            url: '/api/game/' + id
        }).then(function(response) {
            if(response.code == 0) {
                _this.setState({
                    data: response.data
                });
            } else {
                alert(response.msg);
            }
        })
    }

    openDialog(content) {
        this.setState({
            moreDialog: {
                hide: false,
                content: content
            }
        });
    }

    closeDialog() {
        this.setState({
            moreDialog: {
                hide: true,
                content: ''
            }
        });
    }

    openCollarNumberDialog(content,header,explain) {
        this.setState({
            collarNumberDialog: {
                hide: false,
                content: content,
                header:header,
                explain:explain
            }
        });
    }

    closeCollarNumberDialog() {
        this.setState({
            collarNumberDialog: {
                hide: true,
                content: '',
                header: '',
                explain: ''
            }
        });
    }

    gotoGameEnter(event) {
        event.preventDefault();
        event.stopPropagation();
        let {data} = this.state,
            id = data.gameKey;
        // 保存埋点信息
        ws.event({
            typeCode: 1002,
            currentCode: 100213,
            data: {
                id: id
            }
        });

        // 进入游戏
        ws.post({
            url: '/api/game/' + id + '/launch'
        }).then(function(response) {
            if(response.code == 0) {
                window.location.href = response.data;
            } else if(response.code == 401 || response.code == 403) {
                history.replace('/login?from=' + 100102);
            } else {
                alert(response.msg);
            }
        });
    }

    render() {
        let {data, moreDialog, collarNumberDialog} = this.state;
        let {gameKey, gameIcon, gameName, gameAbstract, gameImage1, gameImage2, gameImage3, gameDescribe} = data;
        return (
            <div className="game-detail">
                <div className="game-header">
                    <img className="game-icon" src={gameIcon}/>
                    <div className="game-info">
                        <h1 className="game-name">{gameName ? gameName : ''}</h1>
                        <div className="game-introduction">{gameAbstract ? gameAbstract : ''}</div>
                    </div>
                    <a className="game-btn" href="javascript:void(0)" onClick={this.gotoGameEnter}>开始</a>
                </div>
                <GameDetailScreenshotBox datas={[gameImage1, gameImage2, gameImage3]}/>
                <GameDetailDescriptionBox data={gameDescribe}/>
                <GameDetailGiftBox gameId={gameKey} openDialog={this.openDialog} openCollarNumberDialog={this.openCollarNumberDialog}/>
                <GiftMoreDialog hide={moreDialog.hide} close={this.closeDialog}>
                    {moreDialog.content}
                </GiftMoreDialog>
                <CollarNumberDialog hide={collarNumberDialog.hide} close={this.closeCollarNumberDialog} header={collarNumberDialog.header} explain={collarNumberDialog.explain}>
                    {collarNumberDialog.content}
                </CollarNumberDialog>
            </div>
        )
    }
}