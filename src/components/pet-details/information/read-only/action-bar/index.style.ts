import type {ViewStyle, ImageStyle} from "react-native";

import type {ITheme} from "../../../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    marginTop: 0,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  actionButton: {
    width: 44,
    height: 44,
    marginRight: 15,
    borderRadius: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color6,
  } as ViewStyle,
  actionButtonImage: {
    width: "36%",
    height: "36%",
  } as ImageStyle,
  deleteButton: {
    backgroundColor: theme.color4,
  } as ViewStyle,
});
