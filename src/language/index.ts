import {Platform, NativeModules} from "react-native";

import {ErrorTypes} from "../store/actions/layout";
import {SubViewComponents, ViewComponents} from "../store/actions/navigation";
import {DE} from "./de";
import {EN} from "./en";

export enum LanguageTypes {
  en = "en",
  de = "de",
}

export interface IHeader {
  [K: string]: {
    [L: string]: {
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

export interface ISettings {
  [SubViewComponents.none]: {
    language: string; 
    theme: string; 
    accountDeletion: {
      description: string;
      button: string;
    };
    agbs: {
      description: string;
      button: string;
    }
  }
}

export interface INewPet {
  [SubViewComponents.newPetInformation]: {
    primaryButton: string; 
    secondaryButton: string;
  },
  [SubViewComponents.newPetScan]: {
    primaryButton: string; 
    secondaryButton: string;
    attachmentLabel: string;
  }
}

export interface ICard {
  nameProperty: string;
  animalProperty: string;
}

export interface IError {
  title: string;
  text: string;
};

export type IErrors = {[k in ErrorTypes]: IError};  

export interface ILanguage {
  header: IHeader;
  card: ICard;
  errors: IErrors;
  [ViewComponents.welcome]: IWelcome;
  [ViewComponents.settings]: ISettings;
  [ViewComponents.newPet]: INewPet;
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

const getSystemLanguageIOS = (): LanguageTypes => {
  const systemLanguage = NativeModules.SettingsManager.settings.AppleLocale 
    || NativeModules.SettingsManager.settings.AppleLanguages[0]; 
   
  return (systemLanguage || "").toLowerCase().indexOf(LanguageTypes.de) != -1 ? 
      LanguageTypes.de : LanguageTypes.en;
};

const getSystemLanguageAndroid = (): LanguageTypes => {
  if (NativeModules.I18nManager == null || NativeModules.I18nManager.localeIdentifier == null) {
    return LanguageTypes.en;
  }
  
  const systemLanguage = NativeModules.I18nManager.localeIdentifier;
  
  return (systemLanguage || "").toLowerCase().indexOf(LanguageTypes.de) != -1 ? 
      LanguageTypes.de : LanguageTypes.en;
};

export const getDeviceLanguage = () => {
  const platform = Platform.OS || "";
  switch (platform.toLowerCase()) {
    case "ios":
      return getSystemLanguageIOS();
    case "android": 
      return getSystemLanguageAndroid();
    default:
      return LanguageTypes.en;
  };
};
