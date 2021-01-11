import {ICombinedReducerState} from "../../reducers";

export const ON_REQUEST_DATA_DELETION = "ON_REQUEST_DATA_DELETION";
interface IOnRequesDataDeletion {
  type: typeof ON_REQUEST_DATA_DELETION;
}

export const onRequestDataDeletion = () => async (
  dispatch: any, 
  getState: () => ICombinedReducerState
) => {
    dispatch({type: ON_REQUEST_DATA_DELETION});
}

export const ON_INIT_DATA_FROM_DATABASE = "ON_INIT_DATA_FROM_DATABASE";
interface IOnInitDataFromDatabase {
  type: typeof ON_INIT_DATA_FROM_DATABASE;
}

export const onInitDataFromDatabase = () => async (
  dispatch: any, 
  _: () => ICombinedReducerState
  ) => { 
    dispatch({type: ON_INIT_DATA_FROM_DATABASE});
  };

export const ON_LOADED_DATA_FROM_DATABASE = "ON_LOADED_DATA_FROM_DATABASE";
interface IOnLoadedDataFromDatabase {
  type: typeof ON_LOADED_DATA_FROM_DATABASE;
}

export const onLoadedDataFromDatabase = (): IOnLoadedDataFromDatabase => ({
  type: ON_LOADED_DATA_FROM_DATABASE,
});

export type Actions = 
  | IOnInitDataFromDatabase
  | IOnLoadedDataFromDatabase
;
