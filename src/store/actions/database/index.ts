import {LanguageTypes} from "../../../language";
import {ICombinedReducerState} from "../../reducers";

import {initDatabase} from "../../reducers/database/db";
import {
  getSettings,
  ISettingsEntity,
} from "../../reducers/database/db/settings";
import {getUser, IUserEntity} from "../../reducers/database/db/user";
import {isOnline, setDeviceOnline} from "../layout";

export const ON_INIT_DATA_FROM_DATABASE = "ON_INIT_DATA_FROM_DATABASE";
interface IOnInitDataFromDatabase {
  type: typeof ON_INIT_DATA_FROM_DATABASE;
  settings: ISettingsEntity;
  user: IUserEntity | null;
}

export const onInitDataFromDatabase = (
  settings: ISettingsEntity,
  user: IUserEntity | null,
): IOnInitDataFromDatabase => ({
  type: ON_INIT_DATA_FROM_DATABASE,
  settings,
  user,
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
  language: LanguageTypes;
}

export const ON_CLEAR_IN_MEMORY_DATA = "ON_CLEAR_IN_MEMORY_DATA";
interface IOnClearInMemoryData {
  type: typeof ON_CLEAR_IN_MEMORY_DATA;
}

export const onClearInMemoryData = () => ({
  type: ON_CLEAR_IN_MEMORY_DATA,
});

export const onRequestDataDeletion = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  dispatch({
    type: ON_REQUEST_DATA_DELETION,
    language: state.layout.language,
  } as IOnRequesDataDeletion);
};

export const initStateFromDatabase = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const isDeviceOnline = await isOnline();
  dispatch(setDeviceOnline(isDeviceOnline));

  const state = getState();
  const successful = await initDatabase(state.layout);

  if (successful === false) {
    throw new Error("Unable to initialise database");
  }

  const settings = await getSettings();
  if (settings == null) {
    throw new Error("Unable to get settings from database");
  }

  const user = await getUser();
  dispatch(onInitDataFromDatabase(settings, user));
};

export type Actions =
  | IOnInitDataFromDatabase
  | IOnLoadedDataFromDatabase
  | IOnRequesDataDeletion
  | IOnClearInMemoryData;
