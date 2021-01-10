import {getRepository} from "typeorm/browser";

import * as Entities from "../entities";

import {ThemeTypes} from "../../../../theme";

import {LanguageTypes} from "../../../../language";

const getSettingsRepository = () => {
  const repository = getRepository(Entities.Settings);

  if (repository == null) {
    throw new Error("Settingsrepository not found");
  }

  return repository;
};

export const updateSettings = async (
  theme: ThemeTypes,
  language: LanguageTypes,
) => {
  
  const repo = getSettingsRepository();

  const data = new Entities.Settings();
  data.language = language;
  data.theme = theme;

  await repo.save(data);
};
