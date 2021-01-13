import thunk from "redux-thunk";

import {createStore, applyMiddleware} from '@reduxjs/toolkit'

import {reducer} from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export type AppDispatch = typeof store.dispatch;

export const getStore = () => store; 
