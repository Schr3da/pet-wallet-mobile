import type {ViewStyle, ImageStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (isSelected: boolean) => (theme: ITheme) => ({
  touchContainer: {
    height: 30,
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  container: {
    width: 20,
    height: 20,
    backgroundColor: isSelected ? theme.color6 : theme.color11,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: isSelected ? theme.color3 : theme.color12,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  image: {
    width: "80%",
    height: "80%",
    display: isSelected ? undefined : "none",
  } as ImageStyle,
});
