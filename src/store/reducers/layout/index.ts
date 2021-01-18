import {ThemeTypes, getDeviceTheme} from "../../../theme";
import {LanguageTypes, getDeviceLanguage} from "../../../language";
import {Layout, Splash, Database, Navigation} from "../../actions";

export interface ILayoutState {
  focus: string | null;
  language: LanguageTypes;
  theme: ThemeTypes;
  displayMode: Layout.DisplayModes;
}

const initialState = (): ILayoutState => ({
  focus: null,
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

const changeFocus = (
  state: ILayoutState,
  id: string | null,
) => ({
  ...state,
  focus: id,
});

type Actions = 
  | Database.Actions 
  | Layout.Actions 
  | Navigation.Actions 
  | Splash.Actions
;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_DISPLAY_MODE:
      return changeDisplayMode(state, action.next);
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Layout.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Layout.ON_FOCUS:
      return changeFocus(state, action.id);
    case Navigation.ON_GO_BACK_NAVIGATION:
      return changeFocus(state, null);
    case Navigation.ON_CHANGE_VIEW_COMPONENT:
      return changeFocus(state, null);
    case Navigation.ON_CHANGE_SUBVIEW_COMPONENT:
      return changeFocus(state, null);
    case Database.ON_INIT_DATA_FROM_DATABASE:
      const {language, theme} = action.settings;
      return applyLanguageAndTheme(state, language, theme);
    default:
      return state;
  }
};

export const layout = reducer;
