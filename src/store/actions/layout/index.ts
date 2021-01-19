import {ThemeTypes} from "../../../theme";
import {LanguageTypes} from "../../../language";

export enum DisplayModes {
  portrait = "portrait",
  landscape = "landscape"
}

export const ON_CHANGE_DISPLAY_MODE = "ON_CHANGE_DISPLAY_MODE";
interface IOnChangeDisplayMode{
  type: typeof ON_CHANGE_DISPLAY_MODE;
  mode: DisplayModes;
  width: number;
  height: number;
}

export const onChangeDisplayMode = (
  mode: DisplayModes,
  width: number,
  height: number,
): IOnChangeDisplayMode => ({
  type: ON_CHANGE_DISPLAY_MODE,
  mode, 
  width,
  height,
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

export const ON_SHOW_ERROR = "ON_SHOW_ERROR";
interface IOnShowError {
  type: typeof ON_SHOW_ERROR;
  title: string;
  message: string;
};

export const showError = (
  title: string,
  message: string,
): IOnShowError => ({
  type: ON_SHOW_ERROR,
  title, 
  message,
});


export const ON_FOCUS = "ON_FOCUS";
export interface IOnFocus{
  type: typeof ON_FOCUS
  id: string | null
}

export const onFocus = (
  id: string | null
): IOnFocus => ({
  type: ON_FOCUS,
  id,
})

export type Actions = 
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeDisplayMode
  | IOnFocus
;
