import SQLite from "react-native-sqlite-storage";

import type {ILayoutState} from "../../layout";

import {init, dropDatabase} from "./query";
import {initSettingsTable} from "./settings";

const initScheme = async (
  state: ILayoutState
) => {
  if (__DEV__ === true) {
    SQLite.DEBUG(true);
    await dropDatabase();
  }

  await initSettingsTable(state.theme, state.language);
}

export const initDatabase = async (
  state: ILayoutState, 
): Promise<boolean> => {
  const isSuccessful = await init(); 
  
  if (isSuccessful === false) {
    return false;
  }
 
  await initScheme(state);
  return true;
};
