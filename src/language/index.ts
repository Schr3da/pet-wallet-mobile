import {ViewComponents, SubViewComponents} from "../store/actions/layout";
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

export interface INewPet  {
  petSelection: {
    title: string;
    description: string;
  }
}

export interface ILanguage {
  welcome: IWelcome;
  newPet: INewPet;
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
