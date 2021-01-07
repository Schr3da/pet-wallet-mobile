import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyles = (
  theme: ITheme
) => ({ 
  container: {
    width: "100%",
  },
  navigation: {
    width: "100%",
    height: 20,
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  rowLeft: {
    flex: 1,
    alignItems: "flex-start",
  } as ViewStyle,
  rowRight: {
    flex: 1,
    alignItems: "flex-end",
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
    marginBottom: "10%",
  },
  title: {
    marginBottom: "5%", 
    fontWeight: "bold",
    fontSize: 32,
  } as ViewStyle,
  text: {
    maxWidth: 300,
    marginBottom: "10%",
    textAlign: "center",
    fontSize: 16,
  } as ViewStyle
});
