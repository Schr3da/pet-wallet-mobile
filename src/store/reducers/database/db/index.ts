import SQLite from "react-native-sqlite-storage";

import {isDev} from "../../../../components/common/utils";
import type {ILayoutState} from "../../layout";

import {init, deleteDb} from "./query";
import {initSettingsTable} from "./settings";
import {initUserTable} from "./user";

const initScheme = async (state: ILayoutState) => {
  await initSettingsTable(state.theme, state.language);
  await initUserTable(state.isOnline);
};

export const initDatabase = async (state: ILayoutState): Promise<boolean> => {
  if (isDev()) {
    await deleteDb();
  }

  SQLite.DEBUG(isDev());

  const isSuccessful = await init();

  if (isSuccessful === false) {
    return false;
  }

  await initScheme(state);
  return true;
};

export const deleteDatabase = async (): Promise<boolean> => {
  try {
    await deleteDb();
    return true;
  } catch {
    return false;
  }
}
