import {combineReducers} from "@reduxjs/toolkit";

import {ILayoutState, layout} from "./layout";
import {IPetsState, pets} from "./pets";
import {ISplashState, splash} from "./splash";
import {INavigationState, navigation} from "./navigation";
import {IDatabaseState, database} from "./database";
import {INewPetState, newPet} from "./new-pet";
import {IScanResultState, scan} from "./scan-result";

export interface ICombinedReducerState {
  database: IDatabaseState;
  layout: ILayoutState;
  navigation: INavigationState;
  newPet: INewPetState;
  pets: IPetsState;
  splash: ISplashState;
  scan: IScanResultState;
}

export const reducer = combineReducers({
  database,
  layout,
  navigation,
  newPet,
  pets,
  splash,
  scan,
});
