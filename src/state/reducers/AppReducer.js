// IMPORT PACKAGE REFERENCES

import { combineReducers } from 'redux';


// IMPORT REDUCERS

import { TraitReducer } from './traitReducer';
import{ KeyReducer } from './keyReducer';
import { SpeciesReducer } from './speciesReducer';




// EXPORT APP REDUCER

export const AppReducer = combineReducers({
    key: KeyReducer,
    trait: TraitReducer,
    species: SpeciesReducer
});
