import type {ViewStyle, TextStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: (hasNoValue: boolean) =>
    ({
      width: "100%",
      maxWidth: 300,
      minHeight: hasNoValue ? 150 : null,
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 30,
      paddingBottom: 10,
      borderRadius: 25,
      backgroundColor: theme.color11,
    } as ViewStyle),
  tag: {
    position: "absolute",
    top: 10,
    right: 10,
  } as ViewStyle,
  text: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: theme.color8,
  } as TextStyle,
  input: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: theme.color8,
  } as ViewStyle,
});
