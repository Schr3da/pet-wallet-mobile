import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    width: "100%",
  },
  navigation: {
    height: 20,
    marginLeft: "8%",
    marginRight: "8%",
    display: "flex" as "flex",
    flexDirection: "row" as "row",
  } as ViewStyle,
  backButton: {
    width: 20,
  },
  settingsButton: {
    width: 20,
  },
  meta: {
    backgroundColor: theme.color7,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  image: {
    width: 72,
    height: 72,
    marginTop: "10%",
    marginBottom: "10%",
  },
  title: {
    marginBottom: "5%", 
    fontWeight: "bold",
    fontSize: 32,
  } as ViewStyle,
  text: {
    marginLeft: "12%",
    marginRight: "12%",
    marginBottom: "10%",
    textAlign: "center",
    fontSize: 16,
  } as ViewStyle
});
