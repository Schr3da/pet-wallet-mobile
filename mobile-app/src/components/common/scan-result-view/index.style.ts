import type {ViewStyle, ImageStyle, TextStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 380,
    flex: 1,
  } as ViewStyle,
  imageWrapper: {
    width: "100%",
    height: 100,
    overflow: "hidden",
    borderRadius: 25,
    borderWidth: 6,
    backgroundColor: theme.color11,
    borderColor: theme.color11,
  } as ViewStyle,
  image: {
    width: 480,
    height: 480,
  } as ImageStyle,
  info: {
    color: theme.color8,
    margin: 20,
    textAlign: "center",
  } as TextStyle,
  resultWrapper: {
    width: "100%",
    alignItems: "center",
  } as ViewStyle,
  list: {
    overflow: "hidden",
  } as ViewStyle,
  autocompleteButon: {
    width: 18,
    height: 18,
    marginRight: 5,
  } as ViewStyle,
  removeButton: {
    width: 18,
    height: 18,
  } as ViewStyle,
});
