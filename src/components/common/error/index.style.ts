import type {ViewStyle} from "react-native";

import {DisplayModes} from "../../../store/actions/layout";

import type {ITheme} from "../../../theme";

export const applyStyles = (mode: DisplayModes) => (theme: ITheme) => ({
  container: {
    position: "absolute",
    top: mode === DisplayModes.portrait ? 6 : 10,
    width: "100%",
    maxWidth: 480,
    padding: 12,
    alignItems: "center",
    flexWrap: "nowrap",
    overflow: "hidden",
    borderRadius: 15,
    backgroundColor: theme.color4,
  } as ViewStyle,
  title: {
    flex: 1,
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "bold",
    color: theme.color9,
  } as ViewStyle,
  text: {
    flex: 1,
    fontSize: 14,
    color: theme.color9,
    textAlign: "center",
  } as ViewStyle,
  button: {
    flexShrink: 0,
    padding: 6,
    borderRadius: 100,
  },
});