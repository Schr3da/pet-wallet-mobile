import type {ViewStyle} from "react-native";

import type {ITheme} from "../../theme";

export const applyStyles = (_: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
});
