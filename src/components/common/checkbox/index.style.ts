import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (isSelected: boolean) => (theme: ITheme) => ({
  container: {
    width: 20,
    height: 20,
    backgroundColor: isSelected ? theme.color6 : theme.color11,
    borderRadius: 50,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: isSelected ? theme.color3 : theme.color12,
    marginRight: 8,
  } as ViewStyle,
  innerContainer: {
    width: "100%",
    height: "100%",
  },
});
