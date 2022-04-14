import {createTable, select, insert, update} from "../query";

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

export const updateSettings = async (
  theme: ThemeTypes,
  lanuage: LanguageTypes,
): Promise<boolean> => {
  try {
    const data = await update(
      "settings",
      ["theme", "language"],
      [theme, lanuage],
    );
    return data != null;
  } catch (_) {
    return false;
  }
};

export const updateThemeSetting = async (
  theme: ThemeTypes,
): Promise<boolean> => {
  try {
    const data = await update("settings", ["theme"], [theme]);
    return data != null;
  } catch (_) {
    return false;
  }
};

export const updateLanguageSetting = async (
  language: LanguageTypes,
): Promise<boolean> => {
  try {
    const data = await update("settings", ["language"], [language]);
    return data != null;
  } catch (_) {
    return false;
  }
};
