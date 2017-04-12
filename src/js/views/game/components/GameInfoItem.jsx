import React from 'react';

export default class extends React.Component {

    render() {
        let {data} = this.props,
            {tagId, tagValue, title, content, ctime, url, gameName} = data;
        let eventClass = 'event-type ' + (tagId == 1 ? 'event-activity' : 'event-publish');
        return (
            <table className="game-info-item">
                <tbody>
                    <tr>
                        <td className="event-type-zone">
                            <div className={eventClass}>{tagValue ? tagValue : ''}</div>
                        </td>
                        <td>
                            <a className="event-content" href={url ? url : 'javascript:void(0)'}>
                                <span>【</span>
                                <span>{gameName ? gameName : ''}</span>
                                <span>】</span>
                                <span>{title ? title : ''}</span>
                            </a>
                        </td>
                        <td className="event-date">{ctime && ctime.length >= 10 ? ctime.substring(5, 10) : ''}</td>
                    </tr>
                </tbody>
            </table>
        )
    }
}