import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (_: ITheme) => ({
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
    right: 0,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  removeButton: {
    width: 18,
    height: 18,
  } as ViewStyle,
  addButton: {
    minWidth: 40,
  } as ViewStyle,
});
