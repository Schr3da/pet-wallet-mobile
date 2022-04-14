import type {ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

import {DisplayModes} from "../../../enums/layout";

export const applyStyles = (mode: DisplayModes) => (_: ITheme) => ({
  navigation: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    marginTop: mode === DisplayModes.landscape ? 20 : 0,
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
    height: 48,
    alignItems: "flex-start",
    justifyContent: "center",
  } as ViewStyle,
  settingsButton: {
    width: 48,
    height: 48,
    alignItems: "flex-end",
    justifyContent: "center",
  } as ViewStyle,
  imageIcon: {
    width: 20,
    height: 20,
  },
});
