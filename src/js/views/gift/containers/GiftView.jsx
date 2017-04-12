import React from "react";
import PersonalShortHeader from '../../common/PersonalShortHeader.jsx';
import GiftTabBox from '../components/GiftTabBox.jsx';
import GiftMoreDialog from "../components/GiftMoreDialog.jsx";
import CollarNumberDialog from "../components/CollarNumberDialog.jsx";
import App from '../../common/App.jsx';
import {ws} from '../../../lib/main.js';

export default class GiftView extends React.Component {

    componentWillMount(){
        document.title = 'A站游戏-游戏中心';
        //保存埋点信息
        ws.event({
            typeCode: 1001,
            currentCode: this.props.params.from,
            targetCode: 100105
        });
    }

    constructor(props) {
        super(props);
        this.state = {
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

    render() {
        let {moreDialog, collarNumberDialog} = this.state;
        return (
            <App active="libao">
                <div>
                    <PersonalShortHeader/>
                    <div className="gift-separator"></div>
                    <GiftTabBox openDialog={this.openDialog} openCollarNumberDialog={this.openCollarNumberDialog}/>
                    <GiftMoreDialog hide={moreDialog.hide} close={this.closeDialog}>
                        {moreDialog.content}
                    </GiftMoreDialog>
                    <CollarNumberDialog hide={collarNumberDialog.hide} close={this.closeCollarNumberDialog} header={collarNumberDialog.header} explain={collarNumberDialog.explain}>
                        {collarNumberDialog.content}
                    </CollarNumberDialog>
                </div>
            </App>

        )
    }
}