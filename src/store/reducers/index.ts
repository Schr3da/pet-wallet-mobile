import {combineReducers} from "@reduxjs/toolkit";

import {IGeneralState, general} from "./general";
import {ISplashState, splash} from "./splash";
import {IThemeState, theme} from "./theme";

export interface ICombinedReducerState {
  general: IGeneralState,
  theme: IThemeState,
  splash: ISplashState, 
}

export const reducer = combineReducers({
  general,
  splash,
  theme,
});
