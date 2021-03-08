import {ThemeTypes, getDeviceTheme} from "../../../theme";
import {LanguageTypes, getDeviceLanguage} from "../../../language";
import {Layout, Splash, Database, Navigation, NewPet} from "../../actions";

import {
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
  InputTypes,
} from "../../actions/layout";

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
  isOnline: boolean;
  isLoading: boolean;
  dialogContentType: DialogContentTypes | null;
  isPickerVisible: boolean;
  inputType: InputTypes | null | undefined;
  datePickerMode: Layout.DatePickerModes;
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
    dialogContentType: null,
    isOnline: false,
    isLoading: false,
    isPickerVisible: false,
    inputType: null,
    datePickerMode: Layout.DatePickerModes.datetime,
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
  const next = changeTheme(state, theme);
  return changeLanguage(next, language);
};

const changeFocus = (
  state: ILayoutState,
  id: string | null,
  inputType: InputTypes | null | undefined,
): ILayoutState => {
  const isPickerVisible =
    id != null &&
    (inputType === InputTypes.date || inputType === InputTypes.picker);

  const nextState = setPickerVisible(state, isPickerVisible, inputType);

  return {
    ...nextState,
    focus: id,
  };
};

const setPickerVisible = (
  state: ILayoutState,
  isPickerVisible: boolean,
  inputType: InputTypes | null | undefined,
): ILayoutState => ({
  ...state,
  inputType,
  isPickerVisible,
});

const navigationChange = (state: ILayoutState) => {
  let nextState = handleError(state, null);
  nextState = setPickerVisible(nextState, false, null);
  return changeFocus(nextState, null, null);
};

const setLoading = (state: ILayoutState, isLoading: boolean): ILayoutState => ({
  ...state,
  isLoading,
});

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

const handleDialogContentTypeChange = (
  state: ILayoutState,
  dialogContentType: DialogContentTypes | null,
): ILayoutState => {
  let nextState = changeFocus(state, null, null);
  nextState = setPickerVisible(nextState, false, null);
  return {
    ...nextState,
    dialogContentType,
  };
};

const handleDeviceStatus = (
  state: ILayoutState,
  isOnline: boolean,
): ILayoutState => {
  const error = isOnline ? null : ErrorTypes.deviceIsOffline;
  const nextState = handleError(state, error);

  return {
    ...nextState,
    isOnline,
  };
};

type Actions =
  | Database.Actions
  | Layout.Actions
  | Navigation.Actions
  | NewPet.Actions
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
      return changeFocus(state, action.id, action.inputType);
    case Layout.ON_SET_ERROR_TYPE:
      return handleError(state, action.errorType);
    case Layout.ON_SET_NOTIFCATION_TYPE:
      return handleNotification(state, action.notificationType);
    case Layout.ON_SET_DIALOG_CONTENT_TYPE:
      return handleDialogContentTypeChange(state, action.contentType);
    case Layout.ON_IS_DEVICE_ONLINE:
      return handleDeviceStatus(state, action.isOnline);
    case Layout.ON_SET_LOADING:
      return setLoading(state, action.isLoading);
    case Layout.ON_SET_PICKER_VISIBILITY:
      return setPickerVisible(state, action.isVisible, action.inputType);
    case Navigation.ON_GO_BACK_NAVIGATION:
      return navigationChange(state);
    case Navigation.ON_CHANGE_VIEW_COMPONENT:
      return navigationChange(state);
    case Navigation.ON_CHANGE_SUBVIEW_COMPONENT:
      return navigationChange(state);
    case Database.ON_INIT_DATA_FROM_DATABASE:
      const {language, theme} = action.settings;
      return applyLanguageAndTheme(state, language, theme);
    case Database.ON_REQUEST_DATA_DELETION:
      return handleDialogContentTypeChange(state, null);
    default:
      return state;
  }
};

export const layout = reducer;
