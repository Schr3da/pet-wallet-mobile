import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.color1,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  button: {
    marginTop: 10,
  } as ViewStyle,
});
