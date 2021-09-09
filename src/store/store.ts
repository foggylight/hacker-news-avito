import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import storiesReducer from './storiesReducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(storiesReducer, composedEnhancer);

export default store;
