import {combineReducers} from "@reduxjs/toolkit";

import {ILayoutState, layout} from "./layout";
import {IPetsState, pets} from "./pets";
import {ISplashState, splash} from "./splash";
import {INavigationState, navigation} from "./navigation";
import {IDatabaseState, database} from "./database";
import {INewPetState, newPet} from "./new-pet";
import {IScanResultState, scan} from "./scan-result";
import {IPetDetailsState, petDetails} from "./pet-details";
import {IFiltersState, filters} from "./filters";

export interface ICombinedReducerState {
  database: IDatabaseState;
  layout: ILayoutState;
  navigation: INavigationState;
  newPet: INewPetState;
  pets: IPetsState;
  petDetails: IPetDetailsState;
  splash: ISplashState;
  scan: IScanResultState;
  filters: IFiltersState;
}

export const reducer = combineReducers({
  database,
  layout,
  navigation,
  newPet,
  pets,
  petDetails,
  splash,
  scan,
  filters,
});
