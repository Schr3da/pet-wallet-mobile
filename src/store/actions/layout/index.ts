import {LanguageTypes} from "../../../language";
import {ThemeTypes} from "../../../theme";

export enum ViewComponents {
  splash = "splash",
  welcome = "welcome",
  newPet = "new-pet",
  help = "help",
};

export enum SubViewComponents {
  none = "none",
  helpWelcome = "help-welcome",
}

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
  nextMainView: ViewComponents;
  nextSubView?: SubViewComponents;
}

export const onChangeViewComponent = (
  nextMainView: ViewComponents,
  nextSubView?: SubViewComponents,
): IOnChangeViewComponent => ({
  type: ON_CHANGE_VIEW_COMPONENT,
  nextMainView, 
  nextSubView
});

export const ON_CHANGE_SUBVIEW_COMPONENT = "ON_CHANGE_SUBVIEW_COMPONENT";
interface IOnChangeSubViewComponent{
  type: typeof ON_CHANGE_SUBVIEW_COMPONENT;
  next: SubViewComponents;
}

export const onChangeSubViewComponent = (
  next: SubViewComponents 
): IOnChangeSubViewComponent => ({
  type: ON_CHANGE_SUBVIEW_COMPONENT,
  next, 
});

export type Actions = 
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeViewComponent 
  | IOnChangeSubViewComponent
;
