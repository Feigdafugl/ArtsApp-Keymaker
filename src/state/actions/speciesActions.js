import * as actionTypes from './actionsTypes';


export function changeSpValues(name, value, valueID) {
    return {
        type: actionTypes.SP_INPUT,
        name: name,
        value: value,
        speciesID: valueID,
    };
}

export function addSpecies() {
    return {
        type: actionTypes.ADD_SPECIES,
    };
}

export function removeSpImage(imageID, valueID) {
    return {
        type: actionTypes.REMOVE_SPECIES_IMAGE,
        speciesID: valueID,
        imageID: imageID,
    };
}

export function removeSpecies(spId) {
    return {
        type: actionTypes.REMOVE_SPECIES,
        speciesID: spId,
    };
}
export function setSpecies(species) {
    return {
        type: actionTypes.SET_SPECIES,
        species: species,
    };
}
