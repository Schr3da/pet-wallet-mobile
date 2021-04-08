import type {ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    padding: 12,
    backgroundColor: theme.color3,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  text: {
    flex: 2,
    fontSize: 14,
    color: theme.color9,
  },
  button: {
    padding: 8,
    borderRadius: 100,
    color: theme.color1,
    backgroundColor: theme.color6,
  },
});
