import SQLite from "react-native-sqlite-storage";

import type {ILayoutState} from "../../layout";

import {init, deleteDatabase} from "./query";
import {initSettingsTable} from "./settings";
import {initUserTable} from "./user";
import {isDev} from "../../../../utils";

const initScheme = async (state: ILayoutState) => {
  await initSettingsTable(state.theme, state.language);
  await initUserTable(state.isOnline);
};

export const initDatabase = async (state: ILayoutState): Promise<boolean> => {
  if (isDev()) {
    SQLite.DEBUG(true);
    await deleteDatabase();
  }

  const isSuccessful = await init();

  if (isSuccessful === false) {
    return false;
  }

  await initScheme(state);
  return true;
};
