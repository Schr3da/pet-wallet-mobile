import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    padding: 4,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: theme.color6,
  } as ViewStyle,
  image: (isSelected: boolean) => ({
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: isSelected ? theme.color3 : theme.color6,
  }),
});
