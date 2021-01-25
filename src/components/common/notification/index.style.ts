import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (color: string) => (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 320,
    height: 60,
    padding: 12,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: color,
    backgroundColor: theme.color1,
  } as ViewStyle,
  text: {
    flex: 2,
    fontSize: 13,
    color: theme.color8,
  },
  button: {
    flexShrink: 0,
    padding: 6,
    borderRadius: 100,
    backgroundColor: color,
  },
});
