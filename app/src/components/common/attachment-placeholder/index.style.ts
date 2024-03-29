import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
    borderRadius: 1000,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color11,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  input: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    marginRight: 40,
    color: theme.color8,
    flex: 1,
  },
  button: {
    flexBasis: 20,
    width: 20,
    height: 20,
  },
});
