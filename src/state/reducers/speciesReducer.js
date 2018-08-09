import * as actionTypes from '../actions/actionsTypes';
import update from 'immutability-helper';

// INITIALIZE STATE

/**
 * initial Species object to fill in speciesList
 * @type {Object}
 */
const emptySp = {
    speciesId: 1,
    latinName: '',
    localName: '',
    order: '',
    family: '',
    images: [],
    speciesText: '',
    values: [],
    webPage: ''
};

const initialState = {
    speciesList: [emptySp ],
    speciesCount: 1,
};

/**
 * returns an new empty species object
 * @param {[integer]} index index for the new species
 * @return {array}
 */
function addSpecies(index) {
    return [{
        speciesId: index,
        latinName: '',
        localName: '',
        order: '',
        family: '',
        images: [],
        speciesText: '',
        values: [],
        webPage: ''
    }];
}


// REDUCER

export const SpeciesReducer = (state = initialState, action) => {
    var speciesIndex = 0;
    if (!action.type.startsWith('@@redux')){
        if (action.speciesID) {
            speciesIndex = state.speciesList.findIndex(i => i.speciesId === action.speciesID);
        }
    }
    switch(action.type) {
        case actionTypes.SP_INPUT:
            return update(state,{
                speciesList: {
                    [speciesIndex]: {
                        [action.name]: {$set: action.value}
                    }
                }
            });
        case actionTypes.ADD_SPECIES:
            return update(state,{
                speciesCount: {$set: state.speciesCount + 1},
                speciesList: {$push: addSpecies(state.speciesCount + 1)}
            });
        case actionTypes.REMOVE_SPECIES_IMAGE:
            return update(state,{
                speciesList: {
                    [speciesIndex]: {
                        images: {$splice: [[action.imageID, 1]]}
                    }
                }
            });
        case actionTypes.REMOVE_SPECIES:
            return update(state,{
                speciesList: {$splice: [[speciesIndex, 1]]}
            });
        case actionTypes.SET_SPECIES:
            return update(state, {
                speciesList: {$set: action.species}
            });
        default:
            return state;
    }
};
