import type {TextStyle, ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (isApplePlatform: boolean) => (theme: ITheme) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.color1,
    justifyContent: "center",
    alignItems: "center",
    ...(isApplePlatform
      ? {}
      : {
          height: 100,
          borderTopWidth: 1,
          borderColor: theme.color11,
        }),
  } as ViewStyle,
  picker: {
    width: "100%",
  } as ViewStyle,
  itemStyle: {
    backgroundColor: theme.color1,
  } as TextStyle,
  buttonWrapper: {
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  button: {
    marginTop: 10,
  } as ViewStyle,
});
