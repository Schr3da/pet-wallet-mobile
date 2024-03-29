import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
  } as ViewStyle,
  meta: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  image: {
    width: 72,
    height: 72,
    marginBottom: "5%",
  },
  title: {
    marginBottom: "5%",
    fontWeight: "bold",
    fontSize: 26,
    color: theme.color10,
  } as ViewStyle,
  text: {
    maxWidth: 300,
    marginBottom: "5%",
    textAlign: "center",
    fontSize: 16,
    color: theme.color10,
  } as ViewStyle,
});
