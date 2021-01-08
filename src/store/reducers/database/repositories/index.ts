import {getRepository} from "typeorm/browser";

import * as Entities from "../entities";

export const getSettingsRepository = () => {
  const repository = getRepository(Entities.Settings);

  if (repository == null) {
    throw new Error("Settingsrepository not found");
  }

  return repository;
};
