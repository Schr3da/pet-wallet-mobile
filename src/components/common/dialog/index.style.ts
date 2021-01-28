import type {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

export const applyStyle = (
  theme: ITheme,
) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    padding: 20,
    backgroundColor: theme.color13,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  contentWrapper: {
    width: "100%",
    maxWidth: 380,
    padding: 20,
    backgroundColor: theme.color1,
    borderRadius: 10,
    shadowColor: theme.color11,
    shadowRadius: 10,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  } as ViewStyle,
  textWrapper: {
    marginBottom: 10,
  },
  title: {
    width: "100%",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: theme.color8,
  } as ViewStyle,
  text: {
    width: "100%",
    textAlign: "center",
    fontSize: 15,
    color: theme.color8,
  } as ViewStyle,
  actionWrapper: {
    height: 40,
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  } as ViewStyle,
  buttonWrapper: {
    padding: 10,
    paddingLeft: 30,
    paddingRight: 30,
    borderRadius: 1000,
  } as ViewStyle,
  cancelButton: {
    fontSize: 15,        
    color: theme.color4,
  } as ViewStyle,
  confirmButton: {
    fontSize: 15,        
    color: theme.color3,
  } as ViewStyle,
});
