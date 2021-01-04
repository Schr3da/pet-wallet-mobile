import {combineReducers} from "@reduxjs/toolkit";

import {ILayoutState, layout} from "./layout";
import {IPetsState, pets} from "./pets";
import {ISplashState, splash} from "./splash";

export interface ICombinedReducerState {
  layout: ILayoutState,
  pets: IPetsState,
  splash: ISplashState, 
}

export const reducer = combineReducers({
  layout,
  pets,
  splash,
});
