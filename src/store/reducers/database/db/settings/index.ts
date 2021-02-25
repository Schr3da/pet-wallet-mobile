import {createTable, select, insert} from "../query";

import {ThemeTypes} from "../../../../../theme";
import {LanguageTypes} from "../../../../../language";

export interface ISettingsEntity {
  theme: ThemeTypes;
  language: LanguageTypes;
}

export const initSettingsTable = async (
  theme: ThemeTypes,
  language: LanguageTypes,
) => {
  let settings = await getSettings();

  if (settings != null) {
    return settings;
  }

  await createTable(
    "settings",
    "id INTEGER PRIMARY KEY NOT NULL, theme VARCHAR(6), language VARCHAR(6)",
  );

  await insert("settings", ["id", "theme", "language"], [1, theme, language]);
};

export const getSettings = async (): Promise<ISettingsEntity | null> => {
  try {
    const data = (await select("settings")) || [];

    if (data.length === 0) {
      return null;
    }

    return data[0] as ISettingsEntity;
  } catch (_) {
    return null;
  }
};
