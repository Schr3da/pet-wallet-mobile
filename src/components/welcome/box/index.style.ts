import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "80%",
    height: "40%",
    borderRadius: 20,
    minWidth: 300,
    minHeight: 320,
    maxHeight: 340,
    maxWidth: 320,
    backgroundColor: theme.color6,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  image: {
    width: "90%",
    height: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 60,
  },
});
