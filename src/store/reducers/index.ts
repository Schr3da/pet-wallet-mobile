import {combineReducers} from "@reduxjs/toolkit";

import {ISplashState, splash} from "./splash";

export interface ICombinedReducerState {
  splash: ISplashState, 
}

export const reducer = combineReducers({
  splash,
});
