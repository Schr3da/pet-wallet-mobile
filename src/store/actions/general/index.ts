import {LanguageTypes} from "../../../language";
import {ThemeTypes} from "../../../theme";

export enum ViewComponents {
  splash = "splash",
  welcome = "welcome",
  newPet = "new-pet",
  help = "help",
};

export const ON_CHANGE_CURRENT_THEME = "ON_CHANGE_CURRENT_THEME";
interface IOnChangeCurrentTheme{
  type: typeof ON_CHANGE_CURRENT_THEME;
  next: ThemeTypes;
}

export const onChangeCurrentTheme = (
  next: ThemeTypes
): IOnChangeCurrentTheme => ({
  type: ON_CHANGE_CURRENT_THEME,
  next, 
});

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
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeViewComponent 
;
