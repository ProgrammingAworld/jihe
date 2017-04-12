import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

function system(state = initialState.get('system'), action = {}) {
    let data = _p(action.data);
    switch (action.type) {
        case 'SYSTEM_CHANGE_INFO':
            return state.set('system', data);
        default:
            return state;
    }
}

export default function(state = initialState, action = {}) {
    return state
            .set('system', system(initialState.get('system'), action));
}