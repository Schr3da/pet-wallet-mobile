import type {ViewStyle, ImageStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (hasProfile: boolean) => (theme: ITheme) => ({
  container: {
    width: "100%",
    height: 120,
    maxWidth: 380,
    borderRadius: 25,
    display: "flex",
    overflow: "hidden",
  } as ViewStyle,
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  } as ImageStyle,
  row: {
    padding: 20,
    flex: 1,
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  image: {
    width: 58,
    height: 58,
    flexBasis: 58,
    borderWidth: 4,
    borderColor: theme.color15,
    opacity: hasProfile ? 1 : 0.2,
    overflow: "hidden",
  } as ViewStyle,
  middleWrapper: {
    flex: 1,
    marginTop: 6,
    marginLeft: 10,
    marginRight: 10,
    overflow: "hidden",
  } as ViewStyle,
  buttonOverflow: {
    width: 32,
    minHeight: 24,
    display: "flex",
    alignItems: "flex-end",
  } as ViewStyle,
  overflowIcon: {
    width: 24,
    height: 6,
  },
  buttonShare: {
    width: 32,
    height: 32,
    marginLeft: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  shareIcon: {
    width: 22,
    height: 22,
  },
  pressable: {
    position: "absolute",
    left: 0,
    right: 60,
    top: 0,
    bottom: 0,
  } as ViewStyle
});
