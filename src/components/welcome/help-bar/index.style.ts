import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    flex: 1,
    display: "flex" as "flex",
    justifyContent: "flex-end" as "flex-end",
  } as ViewStyle,
  button: {},
  buttonText: {
    marginBottom: 0,
    color: theme.color3,
    fontSize: 16,
  }
});
