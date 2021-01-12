import {ICombinedReducerState} from "../../reducers";

import {initDatabase} from "../../reducers/database/db";

import {getSettings, ISettingsEntity} from "../../reducers/database/db/settings";

export const ON_INIT_DATA_FROM_DATABASE = "ON_INIT_DATA_FROM_DATABASE";
interface IOnInitDataFromDatabase {
  type: typeof ON_INIT_DATA_FROM_DATABASE;
  settings: ISettingsEntity;
}

export const onInitDataFromDatabase = (
  settings: ISettingsEntity
) => ({
  type: ON_INIT_DATA_FROM_DATABASE,
  settings,
});

export const ON_LOADED_DATA_FROM_DATABASE = "ON_LOADED_DATA_FROM_DATABASE";
interface IOnLoadedDataFromDatabase {
  type: typeof ON_LOADED_DATA_FROM_DATABASE;
}

export const onLoadedDataFromDatabase = (): IOnLoadedDataFromDatabase => ({
  type: ON_LOADED_DATA_FROM_DATABASE,
});

export const ON_REQUEST_DATA_DELETION = "ON_REQUEST_DATA_DELETION";
interface IOnRequesDataDeletion {
  type: typeof ON_REQUEST_DATA_DELETION;
}

export const onRequestDataDeletion = () => async (
  dispatch: any, 
) => {
  dispatch({
    type: ON_REQUEST_DATA_DELETION
  } as IOnRequesDataDeletion);
}

export const initStateFromDatabase = () => async (
  dispatch: any, 
  getState: () => ICombinedReducerState
  ) => { 
    let state = getState();
    let successful = await initDatabase(state.layout);

    if (successful === false) {
      throw new Error("Unable to initialise database");
    }

    const settings = await getSettings();
    if (settings == null) {
      throw new Error("Unable to get settings from database");
    }

    dispatch(onInitDataFromDatabase(settings)); 
  };

export type Actions = 
  | IOnInitDataFromDatabase
  | IOnLoadedDataFromDatabase
  | IOnRequesDataDeletion
;
