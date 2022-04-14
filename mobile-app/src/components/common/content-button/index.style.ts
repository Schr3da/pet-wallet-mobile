import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (color: string) => (theme: ITheme) => ({
  container: {
    width: "100%",
    padding: 12,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: color,
  } as ViewStyle,
  textWrapper: {
    flex: 1,
  } as ViewStyle,
  text: {
    fontSize: 13,
    color: theme.color8,
    overflow: "hidden",
  } as ViewStyle,
  button: {
    padding: 8,
    marginLeft: 4,
    borderRadius: 100,
    backgroundColor: color,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});
