import * as actionTypes from '../actions/actionsTypes';
import update from 'immutability-helper';

// INITIALIZE STATE

const initialState = {
    test: 'true',
    activeKey: {
        title: '',
        author: '',
        description: '',
        level: '',
        descriptionImage: null,
        imageLogo: null,
        publishingLevel: ''
    }
};


// REDUCER

export const KeyReducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.KEY_INPUT:
            return update(state, {
                activeKey: {
                    [action.name]: {$set: action.value}
                }
            });
        case actionTypes.SET_KEY:
            return update(state, {
                activeKey: {$set: action.key}
            });
        default:
            return state;
    }
};
