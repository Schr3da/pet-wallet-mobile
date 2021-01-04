import {combineReducers} from "@reduxjs/toolkit";

import {ILayoutState, layout} from "./layout";
import {IPetsState, pets} from "./pets";
import {ISplashState, splash} from "./splash";
import {INavigationState, navigation} from "./navigation";

export interface ICombinedReducerState {
  layout: ILayoutState,
  navigation: INavigationState,
  pets: IPetsState,
  splash: ISplashState, 
}

export const reducer = combineReducers({
  layout,
  navigation,
  pets,
  splash,
});
