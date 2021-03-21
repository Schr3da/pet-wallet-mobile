import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyFooterStyles = (theme: ITheme) => ({
  container: {
    padding: 5,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color1,
  } as ViewStyle,
});
