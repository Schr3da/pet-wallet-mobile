import {ICombinedReducerState} from "../../reducers";

import {initDatabase, initORM} from "../../reducers/database/db";

export const ON_INIT_DATA_FROM_DATABASE = "ON_INIT_DATA_FROM_DATABASE";
interface IOnInitDataFromDatabase {
  type: typeof ON_INIT_DATA_FROM_DATABASE;
}

export const onInitDataFromDatabase = () => async (
  dispatch: any, 
  _: () => ICombinedReducerState
  ) => { 
    let successful = await initDatabase();
    successful = await initORM();
    
    if (successful === false) {
      throw new Error("Unable to initialise database");
    }

    dispatch({type: ON_INIT_DATA_FROM_DATABASE});
  };

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

export type Actions = 
  | IOnInitDataFromDatabase
  | IOnLoadedDataFromDatabase
  | IOnRequesDataDeletion
;
