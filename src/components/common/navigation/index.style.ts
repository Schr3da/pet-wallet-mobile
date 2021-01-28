import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (_: ITheme) => ({
  navigation: {
    width: "100%",
    height: 32,
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  rowLeft: {
    flex: 1,
    alignItems: "flex-start",
  } as ViewStyle,
  rowRight: {
    flex: 1,
    alignItems: "flex-end",
  } as ViewStyle,
  backButton: {
    width: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  } as ViewStyle,
  settingsButton: {
    width: 48,
    alignItems: "flex-end",
    justifyContent: "center",
  } as ViewStyle,
  imageIcon: {
    width: 20,
    height: 20,
  },
});
