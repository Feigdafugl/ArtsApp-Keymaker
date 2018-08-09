// IMPORT PACKAGES

import { createStore, applyMiddleware } from 'redux';

// MIDDLEWARE
import promiseMiddleware from 'redux-promise-middleware';
import logger from 'redux-logger';

// REDUCERS

import { AppReducer } from '../reducers/AppReducer';


// CONFIGURE STORE
// remove logger for prod

export const createAppStore = () => {
    return createStore(AppReducer, applyMiddleware( logger, promiseMiddleware()));
};
