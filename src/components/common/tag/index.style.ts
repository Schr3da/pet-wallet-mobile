import type {ViewStyle, TextStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    paddingLeft: 6,
    paddingRight: 6,
    paddingTop: 4,
    paddingBottom: 4,
    borderColor: theme.color16,
    borderStyle: "solid",
    borderWidth: 2,
    borderRadius: 1000,
  } as ViewStyle,
  text: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.color16,
  } as TextStyle,
});
