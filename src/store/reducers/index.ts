import {combineReducers} from "@reduxjs/toolkit";

import {ILayoutState, layout} from "./layout";
import {ISplashState, splash} from "./splash";

export interface ICombinedReducerState {
  layout: ILayoutState,
  splash: ISplashState, 
}

export const reducer = combineReducers({
  layout,
  splash,
});
