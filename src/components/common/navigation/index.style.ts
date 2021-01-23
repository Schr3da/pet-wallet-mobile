import {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (
  _: ITheme,
) => ({
  navigation: {
    width: "100%",
    marginTop: 10,
    height: 20,
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
    width: 20,
  },
  settingsButton: {
    width: 20,
  },
});
