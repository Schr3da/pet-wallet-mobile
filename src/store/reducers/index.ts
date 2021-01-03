import {combineReducers} from "@reduxjs/toolkit";

import {IGeneralState, general} from "./general";
import {ISplashState, splash} from "./splash";

export interface ICombinedReducerState {
  general: IGeneralState,
  splash: ISplashState, 
}

export const reducer = combineReducers({
  general,
  splash,
});
