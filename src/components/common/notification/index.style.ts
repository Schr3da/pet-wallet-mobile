import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (color: string) => (theme: ITheme) => ({ 
  container: {
    width: "100%",
    maxWidth: 320,
    height: 60,
    padding: 10,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: color,
    backgroundColor: theme.color1,
  } as ViewStyle,
  text: {
    flex: 2,
    fontSize: 14,
    color: theme.color8,
  },
  button: {
    flexShrink: 0,
    padding: 6,
    borderRadius: 100,
    backgroundColor: color,
  }
});
