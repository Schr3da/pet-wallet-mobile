import {DE} from "./de";
import {EN} from "./en";

export enum LanguageTypes {
  en = "en",
  de = "de",
}

export interface IWelcome {
  noPets: {
    title: string;
    description: string;
  },
  somePets: {
    title: string;
    description: string;
  },
  addPetBar: {
    description: string;
    button: string;
  }
  help: {
    button: string; 
  }
}

export interface ILanguage {
  welcome: IWelcome;
}

export const getLanguageProperties = (
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
