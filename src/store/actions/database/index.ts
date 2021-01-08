import {initConnection} from "../../reducers/database/connection";

export const ON_INIT_DATA_FROM_DATABASE = "ON_INIT_DATA_FROM_DATABASE";
interface IOnInitDataFromDatabase {
  type: typeof ON_INIT_DATA_FROM_DATABASE;
}

export const onInitDataFromDatabase = () => 
  async (dispatch: any) => { 
    const _ = await initConnection(); 
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
