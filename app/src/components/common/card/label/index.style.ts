import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    padding: 2,
    paddingLeft: 8,
    paddingRight: 8,
    borderRadius: 50,
    overflow: "hidden",
  } as ViewStyle,
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.color15,
  } as ViewStyle,
  largeText: {
    fontSize: 16,
    color: theme.color9,
  } as ViewStyle,
  smallText: {
    color: theme.color9,
    fontSize: 12,
    fontWeight: "bold",
  } as ViewStyle,
});
