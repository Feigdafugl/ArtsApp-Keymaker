import * as actionTypes from './actionsTypes';


export function changeTraitValues(name, value, traitID) {
    return {
        type: actionTypes.TRAIT_INPUT,
        name: name,
        value: value,
        traitID: traitID,
    };
}

export function changeValueValues(name, value, valueID, traitID) {
    return {
        type: actionTypes.VALUE_INPUT,
        name: name,
        value: value,
        traitID: traitID,
        valueID: valueID,
    };
}

export function addSpeciesToTrait(value, traitID) {
    return {
        type: actionTypes.ADD_SPECIES_TO_TRAIT,
        value: value,
        traitID: traitID,
    };
}

export function addValue(traitID) {
    return {
        type: actionTypes.ADD_VALUE,
        traitID: traitID,
    };
}

export function addTrait() {
    return {
        type: actionTypes.ADD_TRAIT,
    };
}

export function removeValueImage(imageID, valueID, traitID) {
    return {
        type: actionTypes.REMOVE_VALUE_IMAGE,
        valueID: valueID,
        traitID: traitID,
        imageID: imageID,
    };
}

export function removeTrait(traitID) {
    return {
        type: actionTypes.REMOVE_TRAIT,
        traitID: traitID,
    };
}

export function removeValue(traitID, valueID) {
    return {
        type: actionTypes.REMOVE_VALUE,
        traitID: traitID,
        valueID: valueID,
    };
}

export function setTraits(traits) {
    return{
        type: actionTypes.SET_TRAITS,
        traits: traits,
    };
}
