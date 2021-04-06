import type {ViewStyle, ImageStyle, TextStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  image: {
    width: 96,
    height: 92,
  } as ImageStyle,
  text: {
    marginTop: 28,
    fontSize: 16,
    color: theme.color11, 
  } as TextStyle,
});
