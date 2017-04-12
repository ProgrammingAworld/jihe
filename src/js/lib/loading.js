import _ from "lodash";

const DEFAULT_LOADING_DELAY = 500;

export default async function() {
    let isLoading = true,
        func,
        actions,
        args;
    if(typeof arguments[0] === 'boolean') {
        isLoading = arguments[0];
        func = arguments[1];
        actions = arguments[2];
        args = _.slice(arguments, 2);
    } else {
        func = arguments[0];
        actions = arguments[1];
        args = _.slice(arguments, 1);
    }
    if(isLoading && actions && actions.utilAction) {
        // 延迟显示Loading,如果时间<= delay则,loading不用显示出来,用户体验更好,甚至能给用户加载时间减少了delay的错觉
        window.setTimeout(function() {
            actions.utilAction.showLoading();
        }, DEFAULT_LOADING_DELAY);

    }
    await func.apply(this, args);
    if(isLoading && actions && actions.utilAction) {
        actions.utilAction.hideLoading();
    }
}