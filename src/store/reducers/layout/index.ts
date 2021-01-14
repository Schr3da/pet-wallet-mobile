import {ThemeTypes, getDeviceTheme} from "../../../theme";
import {LanguageTypes, getDeviceLanguage} from "../../../language";
import {Layout, Splash, Database} from "../../actions";

export interface ILayoutState {
  language: LanguageTypes,
  theme: ThemeTypes,
  displayMode: Layout.DisplayModes,
}

const initialState = (): ILayoutState => ({
  language: getDeviceLanguage(),
  theme: getDeviceTheme(),
  displayMode: Layout.DisplayModes.portrait,
});

const changeDisplayMode = (
  state: ILayoutState,
  displayMode: Layout.DisplayModes,
): ILayoutState => state.displayMode === displayMode ? state : ({
  ...state,
  displayMode
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

const applyLanguageAndTheme = (
  state: ILayoutState,
  language: LanguageTypes,
  theme: ThemeTypes
) => {
  let next = changeTheme(state, theme);
  return changeLanguage(next, language);
};

type Actions = Layout.Actions | Splash.Actions | Database.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_DISPLAY_MODE:
      return changeDisplayMode(state, action.next);
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Layout.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Database.ON_INIT_DATA_FROM_DATABASE:
      const {language, theme} = action.settings;
      return applyLanguageAndTheme(state, language, theme);
    default:
      return state;
  }
};

export const layout = reducer;
