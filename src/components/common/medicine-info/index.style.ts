import type {ViewStyle, TextStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 300,
    padding: 14,
    paddingBottom: 10,
    borderRadius: 25,
    backgroundColor: theme.color11,
    display: "flex",
    flexDirection: "column",
  } as ViewStyle,
  titleContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    height: 28,
  } as ViewStyle,
  tag: {
    position: "absolute",
  } as ViewStyle,
  removeButton: {
    position: "absolute",
    right: 0,
    top: 2,
    height: 20,
    width: 20,
    marginLeft: 5,
  } as ViewStyle,
  text: {
    flex: 1,
    fontSize: 14,
    color: theme.color8,
  } as TextStyle,
});
