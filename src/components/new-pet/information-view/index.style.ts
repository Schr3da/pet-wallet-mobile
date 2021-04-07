import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (_: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  profile: {
    width: 120,
    height: 120,
  },
  scrollContainer: {
    flex: 1,
  },
  inputField: {
    marginBottom: 10,
  },
});
