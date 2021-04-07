import type {ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color6,
    borderRadius: 100,
  } as ViewStyle,
  filter: {
    minWidth: 80,
  } as ViewStyle,
});
