import type {ViewStyle, TextStyle, ImageStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  profile: {
    width: 120,
    height: 120,
  } as ImageStyle,
  filterBar: {
    marginTop: 10,
    marginBottom: 10,
  },
  contentWrapper: {
    width: "100%",
    marginTop: 10,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  headline: {
    color: theme.color2,
    marginBottom: 10,
  } as TextStyle,
  inputField: {
    marginBottom: 10,
  } as ViewStyle,
  noData: {
    width: "100%",
    marginTop: 60,
    opacity: 0.8,
  } as ViewStyle,
});

export const applyFooterStyles = (theme: ITheme) => ({
  container: {
    padding: 5,
    borderRadius: 100,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.color1,
  } as ViewStyle,
});
