import * as actionTypes from './actionsTypes';


export function changeKeyValues(name, value, valueID) {
    return {
        type: actionTypes.KEY_INPUT,
        name: name,
        value: value,
        valueID: valueID,
    };
}

export function setKey(key) {
    return {
        type: actionTypes.SET_KEY,
        key: key,
    };
}
