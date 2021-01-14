import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    marginTop: 20,
    display: "flex" as "flex",
    justifyContent: "flex-end" as "flex-end",
  } as ViewStyle,
  button: {},
  buttonText: {
    marginBottom: 0,
    color: theme.color3,
    fontWeight: "bold",
    fontSize: 16,
  } as ViewStyle
});
