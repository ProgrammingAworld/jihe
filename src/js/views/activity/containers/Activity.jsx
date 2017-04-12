import React from 'react';
import Popup from '../components/Popup.jsx'
import Package from '../components/Package.jsx'
import Exchange from '../components/Exchange.jsx'
import FloatingWindow from '../components/FloatingWindow.jsx'

export default class extends React.Component {

    componentWillMount(){
        document.title = '活动主页';
    }

    render() {
        return (
            <div className="youxis">
                <FloatingWindow/>
            </div>
        )
    }

}