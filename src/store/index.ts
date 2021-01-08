import {createStore, applyMiddleware} from '@reduxjs/toolkit'
import thunk from "redux-thunk";
import {reducer} from './reducers'

const store = createStore(
  reducer,
  applyMiddleware(thunk),
);

export type AppDispatch = typeof store.dispatch;

export const getStore = () => store; 
