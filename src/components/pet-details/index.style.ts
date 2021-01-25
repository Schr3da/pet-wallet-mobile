import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyStyles = (_: ITheme) => ({
  container: {
    flex: 1,
    width: "100%",
    borderRadius: 100,
    marginTop: 20,
    alignItems: "center",
  } as ViewStyle,
});
