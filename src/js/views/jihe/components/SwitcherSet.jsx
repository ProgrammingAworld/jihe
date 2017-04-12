import React from 'react';

export default class extends React.Component {

    getItemViews(datas, activeIndex) {
        return _.map(datas, function(item, index) {
            let cls = 'item-btn ' + (index == activeIndex ? 'active' : '');
            return (
                <li key={_.uniqueId()} className="switcher-item">
                    <a className={cls}></a>
                </li>
            )
        })
    }

    render() {
        let {datas, activeIndex} = this.props;
        let itemViews = this.getItemViews(datas, activeIndex);
        return (
            <ul className="switcher">
                {itemViews}
            </ul>
        )
    }

}