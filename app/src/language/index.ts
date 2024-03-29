import {Platform, NativeModules} from "react-native";

import {PetTypes} from "../dto/pets";
import {DE} from "./de";
import {EN} from "./en";
import {SubViewComponents, ViewComponents} from "../enums/navigation";
import {
  NotificationTypes,
  ErrorTypes,
  DialogContentTypes,
} from "../enums/layout";
import {FilterTypes} from "../enums/filters";

export enum LanguageTypes {
  en = "en",
  de = "de",
}

export interface ICommon {
  newEntry: string;
  noScansFound: string;
  continue: string;
  cancel: string;
  pick: string;
  pleaseSelect: string;
  camera: string;
  photoLibrary: string;
  share: string;
  edit: string;
  scan: string;
  remove: string;
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
    };
  };
}

interface ITermsAndConditions {
  generalPart1: string;
  generalPart2: string;
}

export interface INewPet {
  [SubViewComponents.newPetInformation]: {
    name: string;
    animalType: string;
    dateOfBirth: string;
    primaryButton: string;
    secondaryButton: string;
  };
  [SubViewComponents.newPetScan]: {
    primaryButton: string;
    secondaryButton: string;
    attachmentLabel: string;
  };
}

export interface IScanResult {
  scanResultEmpty: string;
  scanResultInfo: string;
  newEntity: string;
  primaryButton: string;
  secondaryButton: string;
}

export interface ICard {
  nameProperty: string;
  animalProperty: string;
}

export interface IMessage {
  title: string;
  text: string;
}

export interface ISharePetDetails {
  message: string;
}

export interface IPetDetails {
  [SubViewComponents.none]: {
    noDataTitle: string;
    notesTitle: string;
    noMedicineDescription: string;
    noVaccinationData: string;
  };
  [SubViewComponents.petDetailsEdit]: {
    generalInformationTitle: string;
    medicalTitle: string;
    notesTitle: string;
    noVaccinationData: string;
  };
}

export type INotifications = {[k in NotificationTypes]: IMessage};

export type IErrors = {[k in ErrorTypes]: IMessage} & {default: IMessage};

export type IDialogs = {[k in DialogContentTypes]: IMessage};

export type AnimalTypes = {[k in PetTypes]: string};

export type IFilters = {
  [ViewComponents.petDetails]: {
    [SubViewComponents.none]: {
      [FilterTypes.generalOnly]: string;
      [FilterTypes.medicalOnly]: string;
    };
    [SubViewComponents.petDetailsEdit]: {
      [FilterTypes.generalOnly]: string;
      [FilterTypes.medicalOnly]: string;
    };
  };
};

export interface ILanguage {
  header: IHeader;
  card: ICard;
  common: ICommon;
  errors: IErrors;
  dialogs: IDialogs;
  animalTypes: AnimalTypes;
  sharePetDetails: ISharePetDetails;
  notifications: INotifications;
  scanResult: IScanResult;
  filters: IFilters;
  [ViewComponents.welcome]: IWelcome;
  [ViewComponents.settings]: ISettings;
  [ViewComponents.newPet]: INewPet;
  [ViewComponents.termsAndConditions]: ITermsAndConditions;
  [ViewComponents.petDetails]: IPetDetails;
}

export const getTranslation = (language: LanguageTypes): ILanguage => {
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
  const systemLanguage =
    NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0];

  return (systemLanguage || "").toLowerCase().indexOf(LanguageTypes.de) != -1
    ? LanguageTypes.de
    : LanguageTypes.en;
};

const getSystemLanguageAndroid = (): LanguageTypes => {
  if (
    NativeModules.I18nManager == null ||
    NativeModules.I18nManager.localeIdentifier == null
  ) {
    return LanguageTypes.en;
  }

  const systemLanguage = NativeModules.I18nManager.localeIdentifier;

  return (systemLanguage || "").toLowerCase().indexOf(LanguageTypes.de) != -1
    ? LanguageTypes.de
    : LanguageTypes.en;
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
  }
};
