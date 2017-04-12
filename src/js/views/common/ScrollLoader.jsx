import React from 'react';

export default function(props) {
    let text = props.text ? props.text : '加载中 ...';
    return (
        <div className="loader">{text}</div>
    )
}