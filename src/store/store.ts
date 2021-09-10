import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import reducer from './reducer';

const composedEnhancer = applyMiddleware(thunkMiddleware);
const store = createStore(reducer, composedEnhancer);

export default store;
