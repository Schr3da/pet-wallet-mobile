import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (
  _: ITheme
) => ({ 
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  appIcon: {
    width: 72,
    height: 72,
  }
});
