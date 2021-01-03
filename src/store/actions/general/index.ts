import {LanguageTypes} from "language";

export enum ViewComponents {
  splash = "splash",
  welcome = "welcome",
  newPet = "new-pet",
  help = "help",
};

export const ON_CHANGE_LANGUAGE = "ON_CHANGE_LANGUAGE";
interface IOnChangeLanguage{
  type: typeof ON_CHANGE_LANGUAGE;
  next: LanguageTypes;
}

export const ON_CHANGE_VIEW_COMPONENT = "ON_CHANGE_VIEW_COMPONENT";
interface IOnChangeViewComponent {
  type: typeof ON_CHANGE_VIEW_COMPONENT;
  next: ViewComponents;
}

export const onChangeViewComponent = (
  next: ViewComponents 
): IOnChangeViewComponent => ({
  type: ON_CHANGE_VIEW_COMPONENT,
  next, 
});

export type Actions = 
  | IOnChangeViewComponent 
  | IOnChangeLanguage
;
