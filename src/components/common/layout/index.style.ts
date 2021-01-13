import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (
  _: ITheme
) => ({
  container: {
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  } as ViewStyle,
  scrollContainer: {
    flex: 1,
  },
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
