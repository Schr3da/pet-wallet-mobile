import {SubViewComponents, ViewComponents} from "../store/actions/navigation";

import {DE} from "./de";

import {EN} from "./en";

export enum LanguageTypes {
  en = "en",
  de = "de",
}

export interface IHeader {
  [key: string]: {
    [L in SubViewComponents]: {
      title: string;
      description: string;
    };
  };
}

interface IWelcomeAddPetBar {
  description: string;
  button: string;
}

interface IWelcomeHelpButton {
  button: string;
}

export interface IWelcome {
  [SubViewComponents.welcomeNoPets]: {
    addPetBar: IWelcomeAddPetBar;
    help: IWelcomeHelpButton;
  };
  [SubViewComponents.welcomeWithPets]: {
    addPetBar: IWelcomeAddPetBar;
  };
}

export interface ILanguage {
  header: IHeader
  [ViewComponents.welcome]: IWelcome;
}

export const getTranslation = (
  language: LanguageTypes,
): ILanguage => {
  switch (language) {
    case LanguageTypes.en: 
      return EN;
    case LanguageTypes.de:
      return DE;
    default:
      return EN;
  }
};
