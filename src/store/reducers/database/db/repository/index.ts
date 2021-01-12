import {getRepository} from "typeorm";

import {Settings} from "../entities";

import {ThemeTypes} from "../../../../../theme";

import {LanguageTypes} from "../../../../../language";

export const updateSettings = async () => {
  try {
    console.log("update Settings");
  } catch (error) {
    console.log(error);
  }
};
