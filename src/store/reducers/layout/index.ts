import {ThemeTypes, getDeviceTheme} from "../../../theme";

import {LanguageTypes, getDeviceLanguage} from "../../../language";

import {Layout, Splash} from "../../actions";

export interface ILayoutState {
  language: LanguageTypes,
  theme: ThemeTypes,
}

const initialState = (): ILayoutState => ({
  language: getDeviceLanguage(),
  theme: getDeviceTheme(),
});

const changeLanguage = (
  state: ILayoutState,
  language: LanguageTypes,
): ILayoutState => state.language === language ? state : ({
  ...state,
  language
});

const changeTheme = (
  state: ILayoutState,
  theme: ThemeTypes
): ILayoutState =>
  state.theme === theme ? state : ({
    ...state,
    theme,
  });

type Actions = Layout.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Layout.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    default:
      return state;
  }
};

export const layout = reducer;
