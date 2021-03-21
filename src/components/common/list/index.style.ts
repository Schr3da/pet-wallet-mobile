import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    alignItems: "center",
  } as ViewStyle,
  item: {
    height: 40,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  actionWrapper: {
    position: "absolute",
    height: "100%",
    paddingLeft: 20,
    right: 14,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.color11,
  } as ViewStyle,
  addButton: {
    minWidth: 40,
  } as ViewStyle,
});
