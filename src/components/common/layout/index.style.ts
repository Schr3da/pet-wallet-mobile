import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (
  _: ITheme
) => ({
  container: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  } as ViewStyle,
  navigation: {
    width: "100%",
    marginTop: 10,
    height: 20,
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  layoutWrapper: {
    width: "100%",
    flex: 1,
  } as ViewStyle,
  contentViewWrapper: {
    alignItems: "center",
    flex: 1,
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
    width: 20,
  },
  settingsButton: {
    width: 20,
  },
});
