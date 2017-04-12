import Immutable from "immutable";

export default function (value) {
    if(value != null && typeof value.toJS === 'undefined') {
        value = Immutable.fromJS(value);
    }
    return value;
}