import * as NetInfo from "@react-native-community/netinfo";

import {Dimensions, Platform} from "react-native";

import {ThemeTypes} from "../../../theme";
import {LanguageTypes} from "../../../language";
import {
  updateLanguageSetting,
  updateThemeSetting,
} from "../../reducers/database/db/settings";

import {
  DisplayModes,
  ErrorTypes,
  NotificationTypes,
  InputTypes,
  DialogContentTypes,
} from "../../../enums/layout";
import {ICombinedReducerState} from "../../reducers";

export const getScreenSize = () => {
  const window = Dimensions.get("window");
  return {
    width: window.width,
    height: window.height,
  };
};

export const getDisplayMode = (width: number, height: number) =>
  width > height ? DisplayModes.landscape : DisplayModes.portrait;

export const isiOS = (): boolean => {
  const identifier = (Platform.OS || "").toLowerCase();
  return identifier === "ios";
};

export const isOnline = async (): Promise<boolean> => {
  const info = await NetInfo.fetch();

  if (info == null) {
    return false;
  }

  const {type} = info;
  return type === "cellular" || type === "wifi";
};

export const ON_IS_DEVICE_ONLINE = "ON_IS_DEVICE_ONLINE";
interface IOnIsDeviceOnline {
  type: typeof ON_IS_DEVICE_ONLINE;
  isOnline: boolean;
}

export const setDeviceOnline = (isOnline: boolean) => ({
  type: ON_IS_DEVICE_ONLINE,
  isOnline,
});

export const ON_CHANGE_DISPLAY_MODE = "ON_CHANGE_DISPLAY_MODE";
interface IOnChangeDisplayMode {
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
interface IOnChangeCurrentTheme {
  type: typeof ON_CHANGE_CURRENT_THEME;
  next: ThemeTypes;
}

export const onChangeCurrentTheme = (next: ThemeTypes) => async (
  dispatch: any,
  _: () => ICombinedReducerState,
) => {
  const successful = await updateThemeSetting(next);

  if (successful === false) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
  }

  dispatch({
    type: ON_CHANGE_CURRENT_THEME,
    next,
  });
};

export const ON_SET_LOADING = "ON_SET_LOADING";
interface IOnSetLoading {
  type: typeof ON_SET_LOADING;
  isLoading: boolean;
}

export const setLoading = (isLoading: boolean): IOnSetLoading => ({
  type: ON_SET_LOADING,
  isLoading,
});

export const ON_CHANGE_LANGUAGE = "ON_CHANGE_LANGUAGE";
interface IOnChangeLanguage {
  type: typeof ON_CHANGE_LANGUAGE;
  next: LanguageTypes;
}

export const onChangeLanguage = (next: LanguageTypes) => async (
  dispatch: any,
): Promise<void> => {
  const successful = await updateLanguageSetting(next);

  if (successful === false) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
  }

  dispatch({
    type: ON_CHANGE_LANGUAGE,
    next,
  });
};

export const ON_SET_ERROR_TYPE = "ON_SET_ERROR_TYPE";
interface IOnSetErrorType {
  type: typeof ON_SET_ERROR_TYPE;
  errorType: ErrorTypes | null;
}

export const onSetErrorCode = (
  errorType: ErrorTypes | null,
): IOnSetErrorType => ({
  type: ON_SET_ERROR_TYPE,
  errorType,
});

export const clearErrors = () => onSetErrorCode(null);

export const ON_SET_NOTIFCATION_TYPE = "ON_SET_NOTIFCATION_TYPE";
interface IOnSetNotificationType {
  type: typeof ON_SET_NOTIFCATION_TYPE;
  notificationType: NotificationTypes | null;
}

export const onSetNotificationType = (
  notificationType: NotificationTypes | null,
): IOnSetNotificationType => ({
  type: ON_SET_NOTIFCATION_TYPE,
  notificationType,
});

export const ON_FOCUS = "ON_FOCUS";
export interface IOnFocus {
  type: typeof ON_FOCUS;
  id: string | null;
  inputType: InputTypes | null | undefined;
}

export const onFocus = (
  id: string | null,
  inputType: InputTypes | null | undefined,
): IOnFocus => ({
  type: ON_FOCUS,
  id,
  inputType,
});

export const ON_SET_DIALOG_CONTENT_TYPE = "ON_SET_DIALOG_CONTENT";
export interface IOnSetDialogContentType {
  type: typeof ON_SET_DIALOG_CONTENT_TYPE;
  contentType: DialogContentTypes | null;
}

export const onSetDialogContentType = (
  contentType: DialogContentTypes,
): IOnSetDialogContentType => ({
  type: ON_SET_DIALOG_CONTENT_TYPE,
  contentType,
});

export const onDismissDialog = () => (dispatch: any) => {
  dispatch({
    type: ON_SET_DIALOG_CONTENT_TYPE,
    contentType: null,
  });
  dispatch(setLoading(false));
};

export const ON_SET_PICKER_VISIBILITY = "ON_SET_PICKER_VISIBILITY";
export interface IOnSetPickerVisibility {
  type: typeof ON_SET_PICKER_VISIBILITY;
  isVisible: boolean;
  inputType: InputTypes;
}

export const onSetPickerVisibility = (
  isVisible: boolean,
  inputType: InputTypes,
): IOnSetPickerVisibility => ({
  type: ON_SET_PICKER_VISIBILITY,
  isVisible,
  inputType,
});

export type Actions =
  | IOnIsDeviceOnline
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeDisplayMode
  | IOnFocus
  | IOnSetErrorType
  | IOnSetNotificationType
  | IOnSetDialogContentType
  | IOnSetLoading
  | IOnSetPickerVisibility;
