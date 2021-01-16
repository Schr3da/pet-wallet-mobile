import {LanguageTypes} from "../../../language";

export enum ViewComponents {
  splash = "splash",
  welcome = "welcome",
  newPet = "newPet",
  help = "help",
  settings = "settings",
  termsAndConditions = "termsAndConditions"
};

export enum SubViewComponents {
  none = "none",
  welcomeNoPets = "welcomeNoPets",
  welcomeWithPets = "welcomeWithPets",
  newPetInformation = "newPetInformation",
  newPetScan = "newPetScan",
}

export const ON_CHANGE_VIEW_COMPONENT = "ON_CHANGE_VIEW_COMPONENT";
interface IOnChangeViewComponent {
  type: typeof ON_CHANGE_VIEW_COMPONENT;
  nextMainView: ViewComponents;
  nextSubView: SubViewComponents;
  language: LanguageTypes;
}

export const onChangeViewComponent = (
  nextMainView: ViewComponents,
  nextSubView: SubViewComponents,
  language: LanguageTypes,
): IOnChangeViewComponent => ({
  type: ON_CHANGE_VIEW_COMPONENT,
  nextMainView, 
  nextSubView,
  language
});

export const ON_CHANGE_SUBVIEW_COMPONENT = "ON_CHANGE_SUBVIEW_COMPONENT";
interface IOnChangeSubViewComponent{
  type: typeof ON_CHANGE_SUBVIEW_COMPONENT;
  next: SubViewComponents;
  language: LanguageTypes;
}

export const onChangeSubViewComponent = (
  next: SubViewComponents, 
  language: LanguageTypes,
): IOnChangeSubViewComponent => ({
  type: ON_CHANGE_SUBVIEW_COMPONENT,
  next, 
  language
});

export const ON_GO_BACK_NAVIGATION = "ON_GO_BACK_NAVIGATION";
interface IOnGoBackNavigation{
  type: typeof ON_GO_BACK_NAVIGATION;
  language: LanguageTypes;
}

export const onGoBackNavigation = (
  language: LanguageTypes
): IOnGoBackNavigation => ({
  type: ON_GO_BACK_NAVIGATION,
  language,
});

export type Actions =  
  | IOnGoBackNavigation
  | IOnChangeViewComponent
  | IOnChangeSubViewComponent
;
