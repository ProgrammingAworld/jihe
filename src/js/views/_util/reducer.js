import initialState from "./store.js";
import _p from "../../lib/immutable-process.js";

function loading(state = initialState.get("loading"), action = {}) {
    switch (action.type) {
        case "LOADING_SHOW":
            return state + 1;
        case "LOADING_HIDE":
            return state - 1;
        default:
            return state;
    }
}

function toast(state = initialState.get("toast"), action = {}) {
    switch (action.type) {
        case "TOAST_SHOW":
            return state.set("show", true).set("text", action.text);
        case "TOAST_HIDE":
            return state.set("show", false).set("text", "");
        default:
            return state;
    }
}

function nav(state = initialState.get('nav'), action = {}) {
    let data = _p(action.data);
    switch (action.type) {
        case 'NAV_CHANGE_ACTIVE':
            return state.set('active', data);
        default:
            return state;
    }
}

export default function (state = initialState, action = {}) {
    return state
        .set("loading", loading(state.get("loading"), action))
        .set("toast", toast(state.get("toast"), action))
        .set("nav", nav(state.get("nav"), action));
}