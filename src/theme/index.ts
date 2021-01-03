import {StyleSheet} from "react-native";

export interface ITheme {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
};

const LightTheme: ITheme = {
  color1: "#ffffff",
  color2: "#E6E6E6",
  color3: "#5BA4FF",
  color4: "#FF4340",
  color5: "#FDCB02",
  color6: "#D9EFFF",
  color7: "transparent",
};

const DarkTheme: ITheme = {
  color1: "#ffffff",
  color2: "#E6E6E6",
  color3: "#5BA4FF",
  color4: "#FF4340",
  color5: "#FDCB02",
  color6: "#D9EFFF",
  color7: "transparent",
}

export enum ThemeTypes {
  Dark,
  Light
}

export const getColors = (
  theme: ThemeTypes
): ITheme => 
  ThemeTypes.Dark === theme ? DarkTheme : LightTheme;

type useThemeCallback<
  T extends StyleSheet.NamedStyles<T> |
  StyleSheet.NamedStyles<any>
> = (colors: ITheme) => T

export const createStyle = <T>(
  theme: ThemeTypes,
  cb: useThemeCallback<T>
) => {
  let colors = getColors(theme);
  let styles = cb(colors);
  return StyleSheet.create(styles);
}

export const createStyleWithoutTheme =
  (styles: any) => StyleSheet.create(styles);
