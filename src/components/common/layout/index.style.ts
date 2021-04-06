import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (_: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  } as ViewStyle,
  layoutWrapper: {
    width: "100%",
    flex: 1,
  } as ViewStyle,
  contentViewWrapper: {
    minHeight: "100%",
    alignItems: "center",
    flex: 1,
  } as ViewStyle,
});
