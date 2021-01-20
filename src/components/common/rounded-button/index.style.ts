import type {ViewStyle} from "react-native";

import {ITheme} from "../../../theme"

export const applyStyles = 
  (background: string, color: string) => ({
    container: {
      minWidth: 120,
      borderRadius: 50,
      backgroundColor: background,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    title: {
      textAlign: "center",
      fontSize: 16,
      color,
    } as ViewStyle
  });
