import {Dimensions, Platform} from "react-native";

import {ThemeTypes} from "../../../theme";
import {LanguageTypes} from "../../../language";

export enum ErrorTypes {
  inputField = "inputFieldError",
  camera = "cameraError",
  photoLibrary = "photoLibraryError",
}

export enum NotificationTypes {
  termsAndConditions = "termsAndConditions",
  savedData = "savedData"
}

export enum DisplayModes {
  portrait = "portrait",
  landscape = "landscape",
}

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

export const onChangeCurrentTheme = (
  next: ThemeTypes,
): IOnChangeCurrentTheme => ({
  type: ON_CHANGE_CURRENT_THEME,
  next,
});

export const ON_CHANGE_LANGUAGE = "ON_CHANGE_LANGUAGE";
interface IOnChangeLanguage {
  type: typeof ON_CHANGE_LANGUAGE;
  next: LanguageTypes;
}

export const onChangeLanguage = (next: LanguageTypes): IOnChangeLanguage => ({
  type: ON_CHANGE_LANGUAGE,
  next,
});

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
interface IOnSetNotificationType{
  type: typeof ON_SET_NOTIFCATION_TYPE;
  notificationType: NotificationTypes | null;
}

export const onSetNotificationType = (
  notificationType: NotificationTypes | null,
): IOnSetNotificationType => ({
  type: ON_SET_NOTIFCATION_TYPE,
  notificationType,
});

export const clearNotificatin = () => onSetNotificationType(null);

export const ON_FOCUS = "ON_FOCUS";
export interface IOnFocus {
  type: typeof ON_FOCUS;
  id: string | null;
}

export const onFocus = (id: string | null): IOnFocus => ({
  type: ON_FOCUS,
  id,
});

export type Actions =
  | IOnChangeCurrentTheme
  | IOnChangeLanguage
  | IOnChangeDisplayMode
  | IOnFocus
  | IOnSetErrorType
  | IOnSetNotificationType
;
