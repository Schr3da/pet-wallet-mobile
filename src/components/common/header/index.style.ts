import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (
  theme: ITheme
) => ({ 
  container: {
    width: "100%",
  }, 
  meta: {
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  image: {
    width: 72,
    height: 72,
    marginBottom: "5%",
  },
  title: {
    marginBottom: "5%", 
    fontWeight: "bold",
    fontSize: 26,
    color: theme.color10,
  } as ViewStyle,
  text: {
    maxWidth: 300,
    marginBottom: "10%",
    textAlign: "center",
    fontSize: 16,
    color: theme.color10,
  } as ViewStyle
});
