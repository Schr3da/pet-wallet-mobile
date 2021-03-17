import type {ViewStyle, ImageStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
  } as ViewStyle,
  imageWrapper: {
    width: "100%",
    maxWidth: 380,
    height: 100,
    overflow: "hidden",
    borderRadius: 100,
    borderWidth: 6,
    backgroundColor: theme.color11,
    borderColor: theme.color11,
  } as ViewStyle,
  image: {
    width: 480,
    height: 480,
  } as ImageStyle,
  entryWrapper: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    display: "flex",
    alignItems: "center",
  } as ViewStyle,
  inputTypeField: {} as ViewStyle,
});
