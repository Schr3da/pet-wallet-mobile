import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    height: 40,
    maxWidth: 300,
    borderRadius: 1000,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color11,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  text: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: theme.color8,
  },
  input: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: theme.color8,
  } as ViewStyle,
});
