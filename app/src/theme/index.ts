import {Appearance, StyleSheet} from "react-native";

export interface ITheme {
  color1: string;
  color2: string;
  color3: string;
  color4: string;
  color5: string;
  color6: string;
  color7: string;
  color8: string;
  color9: string;
  color10: string;
  color11: string;
  color12: string;
  color13: string;
  color14: string;
  color15: string;
  color16: string;
}

const LightTheme: ITheme = {
  color1: "#ffffff",
  color2: "#E6E6E6",
  color3: "#5BA4FF",
  color4: "#FF4340",
  color5: "#f1c40f",
  color6: "#D9EFFF",
  color7: "transparent",
  color8: "#000000",
  color9: "#ffffff",
  color10: "#000000",
  color11: "#efefef",
  color12: "#afafaf",
  color13: "rgba(255, 255, 255, 0.9)",
  color14: "#5BA4FF",
  color15: "rgba(230, 230, 230, 0.18)",
  color16: "#aaa",
};

const DarkTheme: ITheme = {
  color1: "#000000",
  color2: "#E6E6E6",
  color3: "#85AECB",
  color4: "#FF4340",
  color5: "#f1c40f",
  color6: "#1F4560",
  color7: "transparent",
  color8: "#ffffff",
  color9: "#ffffff",
  color10: "#ffffff",
  color11: "#333333",
  color12: "#afafaf",
  color13: "rgba(0, 0, 0, 0.9)",
  color14: "#5BA4FF",
  color15: "rgba(100, 100, 100, 0.2)",
  color16: "#aaa",
};

export enum ThemeTypes {
  Dark = "dark",
  Light = "light",
}

export const getColors = (theme: ThemeTypes): ITheme =>
  ThemeTypes.Dark === theme ? DarkTheme : LightTheme;

type useThemeCallback<
  T extends StyleSheet.NamedStyles<T> | StyleSheet.NamedStyles<any>
> = (colors: ITheme) => T;

export const createStyle = <T>(theme: ThemeTypes, cb: useThemeCallback<T>) => {
  const colors = getColors(theme);
  const styles = cb(colors);
  return StyleSheet.create(styles);
};

export const createStyleWithoutTheme = <T>(styles: T) =>
  StyleSheet.create(styles);

export const getDeviceTheme = () => {
  const scheme = Appearance.getColorScheme();

  if (scheme == null) {
    return ThemeTypes.Light;
  }

  return (scheme || "").toLowerCase() === ThemeTypes.Dark
    ? ThemeTypes.Dark
    : ThemeTypes.Light;
};
