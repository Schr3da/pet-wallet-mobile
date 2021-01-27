import {ThemeTypes, getDeviceTheme} from "../../../theme";
import {LanguageTypes, getDeviceLanguage} from "../../../language";
import {Layout, Splash, Database, Navigation} from "../../actions";
import {ErrorTypes, NotificationTypes} from "../../actions/layout";

export interface ILayoutState {
  notificationType: NotificationTypes | null;
  errorType: ErrorTypes | null;
  isApplePlatform: boolean;
  focus: string | null;
  language: LanguageTypes;
  theme: ThemeTypes;
  displayMode: Layout.DisplayModes;
  screenWidth: number;
  screenHeight: number;
}

const initialState = (): ILayoutState => {
  const screen = Layout.getScreenSize();
  const mode = Layout.getDisplayMode(screen.width, screen.height);
  const isApplePlatform = Layout.isiOS();

  return {
    notificationType: null, 
    errorType: null,
    focus: null,
    isApplePlatform,
    language: getDeviceLanguage(),
    theme: getDeviceTheme(),
    displayMode: mode,
    screenWidth: screen.width,
    screenHeight: screen.height,
  };
};

const changeDisplayMode = (
  state: ILayoutState,
  displayMode: Layout.DisplayModes,
  screenWidth: number,
  screenHeight: number,
): ILayoutState =>
  state.displayMode === displayMode
    ? state
    : {
        ...state,
        displayMode,
        screenWidth,
        screenHeight,
      };

const changeLanguage = (
  state: ILayoutState,
  language: LanguageTypes,
): ILayoutState =>
  state.language === language
    ? state
    : {
        ...state,
        language,
      };

const changeTheme = (state: ILayoutState, theme: ThemeTypes): ILayoutState =>
  state.theme === theme
    ? state
    : {
        ...state,
        theme,
      };

const applyLanguageAndTheme = (
  state: ILayoutState,
  language: LanguageTypes,
  theme: ThemeTypes,
): ILayoutState => {
  let next = changeTheme(state, theme);
  return changeLanguage(next, language);
};

const changeFocus = (state: ILayoutState, id: string | null) => ({
  ...state,
  focus: id,
});

const navigationChange = (state: ILayoutState) => {
  const nextState = handleError(state, null);
  return changeFocus(nextState, null);
};

const handleError = (
  state: ILayoutState,
  errorType: ErrorTypes | null,
): ILayoutState => ({
  ...state,
  errorType,
});

const handleNotification = (
  state: ILayoutState,
  notificationType: NotificationTypes | null,
): ILayoutState => ({
  ...state,
  notificationType,
});

type Actions =
  | Database.Actions
  | Layout.Actions
  | Navigation.Actions
  | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_DISPLAY_MODE:
      return changeDisplayMode(state, action.mode, action.width, action.height);
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Layout.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Layout.ON_FOCUS:
      return changeFocus(state, action.id);
    case Layout.ON_SET_ERROR_TYPE:
      return handleError(state, action.errorType);
    case Layout.ON_SET_NOTIFCATION_TYPE:
      return handleNotification(state, action.notificationType);
    case Navigation.ON_GO_BACK_NAVIGATION:
      return navigationChange(state);
    case Navigation.ON_CHANGE_VIEW_COMPONENT:
      return navigationChange(state);
    case Navigation.ON_CHANGE_SUBVIEW_COMPONENT:
      return navigationChange(state);
    case Database.ON_INIT_DATA_FROM_DATABASE:
      const {language, theme} = action.settings;
      return applyLanguageAndTheme(state, language, theme);
    default:
      return state;
  }
};

export const layout = reducer;
