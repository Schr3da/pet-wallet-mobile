import {ThemeTypes} from "../../../theme";

import {LanguageTypes} from "../../../language";

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

export type Actions = 
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
;
