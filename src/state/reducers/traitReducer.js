import * as actionTypes from '../actions/actionsTypes';
import update from 'immutability-helper';

// INITIALIZE STATE

const initTrait =  {
    traitId: 1,
    traitText: '',
    important: false,
    traitDescription: '',
    hasSp:[],
    values: [
        {
            valueId: 1,
            valueText: '',
            valueInfo: '',
            images: [],
        }
    ]
};

const initialState = {
    traitValueCombo: [initTrait],
    trigger: false,
    traitCount: 1,
    valueCount: 1,
};

function addValue(index) {
    return [{
        valueId: index,
        valueText: '',
        valueInfo: '',
        images: [],
    }];
}

function addTrait(traitIndex, valueIndex) {
    return [{
        traitId: traitIndex,
        traitText: '',
        important: false,
        traitDescription: '',
        hasSp:[],
        values: [
            {
                valueId: valueIndex,
                valueText: '',
                valueInfo: '',
                images: [],
            }
        ]
    }];
}


// REDUCER

export const TraitReducer = (state = initialState, action) => {
    var traitIndex = 0;
    var valueIndex = 0;
    if (!action.type.startsWith('@@redux')){
        if (action.traitID) {
            traitIndex = state.traitValueCombo.findIndex(i => i.traitId === action.traitID);
        }
        if (action.valueID) {
            valueIndex = state.traitValueCombo[traitIndex].values.findIndex(i => i.valueId === action.valueID);
        }
    }
    switch(action.type) {
        case actionTypes.TRAIT_INPUT:
            return update(state,{
                traitValueCombo: {
                    [traitIndex]: {
                        [action.name]: {$set: action.value}
                    }
                }
            });
        case actionTypes.VALUE_INPUT:
            return update(state,{
                traitValueCombo: {
                    [traitIndex]: {
                        values: {
                            [valueIndex]: {
                                [action.name]: {$set: action.value}
                            }
                        }
                    }
                }
            });
        case actionTypes.ADD_SPECIES_TO_TRAIT:
            return update(state,{
                trigger: {$set: !state.trigger},
                traitValueCombo: {
                    [traitIndex]: {
                        hasSp: {$set: action.value}
                    }
                }
            });
        case actionTypes.ADD_VALUE:
            return update(state,{
                valueCount: {$set: (state.valueCount + 1)},
                traitValueCombo: {
                    [traitIndex]: {
                        values: {$push: addValue(state.valueCount + 1)}
                    }
                }
            });
        case actionTypes.ADD_TRAIT:
            return update(state,{
                traitCount: {$set: state.traitCount + 1},
                valueCount: {$set: state.valueCount + 1},
                traitValueCombo: {$push: addTrait(state.traitCount + 1, state.valueCount + 1)}
            });
        case actionTypes.REMOVE_VALUE_IMAGE:
            return update(state,{
                traitValueCombo: {
                    [traitIndex]: {
                        values: {
                            [valueIndex]: {
                                images: {$splice: [[action.imageID, 1]]}
                            }
                        }
                    }
                }
            });
        case actionTypes.REMOVE_TRAIT:
            return update(state,{
                traitValueCombo: {$splice: [[traitIndex, 1]]}
            });
        case actionTypes.REMOVE_VALUE:
            return update(state,{
                traitValueCombo: {
                    [traitIndex]: {
                        values: {$splice: [[valueIndex, 1]]}
                    }
                }
            });
        case actionTypes.SET_TRAITS:
            return update(state, {

                traitValueCombo: {$set: action.traits}
            });
        default:
            return state;
    }
};
