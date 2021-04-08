import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  paragraph: {
    margin: 10,
    color: theme.color8,
  },
});
