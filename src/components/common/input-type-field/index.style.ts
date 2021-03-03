import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (hasValue: boolean) => (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 1000,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color11,
    overflow: "hidden",
  } as ViewStyle,
  input: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: hasValue ? theme.color8 : "#AAA",
  } as ViewStyle,
});
