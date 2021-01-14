import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (
  theme: ITheme
) => ({ 
  container: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 1000,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color11,
  } as ViewStyle,
  input: {
    width: "100%",
    fontSize: 16,
    color: theme.color8,
  }
});



