import {ViewStyle} from "react-native";

import {ITheme} from "../../../../theme";

export const applyStyles = (
  theme: ITheme
) => ({
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
    backgroundColor: theme.color6,
    opacity: 0.3,
  } as ViewStyle,
  largeText: {
    fontSize: 16,
    color: theme.color10,
  } as ViewStyle,
  smallText: {
    color: theme.color10,
    fontSize: 12,
    fontWeight: "bold",
  } as ViewStyle,
});
