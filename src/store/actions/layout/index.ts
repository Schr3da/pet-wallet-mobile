import {ThemeTypes} from "../../../theme";
import {LanguageTypes} from "../../../language";

export enum DisplayModes {
  portrait = "portrait",
  landscape = "landscape"
}

export const ON_CHANGE_DISPLAY_MODE = "ON_CHANGE_DISPLAY_MODE";
interface IOnChangeDisplayMode{
  type: typeof ON_CHANGE_DISPLAY_MODE;
  next: DisplayModes;
}

export const onChangeDisplayMode = (
  next: DisplayModes
): IOnChangeDisplayMode => ({
  type: ON_CHANGE_DISPLAY_MODE,
  next, 
});

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

export const onChangeLanguage = (
  next: LanguageTypes,
): IOnChangeLanguage => ({
  type: ON_CHANGE_LANGUAGE,
  next, 
});

export type Actions = 
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeDisplayMode
;
