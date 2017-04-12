import React from "react";
import Footer from './Footer.jsx';

export default class extends React.Component{

    render() {
        let {children, ...other} = this.props;
        return (
            <div id="container">
                {children}
                {/* <Footer {...other}/> */}
            </div>
        )
    }
}
