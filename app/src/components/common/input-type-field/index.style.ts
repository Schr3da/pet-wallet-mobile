import type {ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (hasValue: boolean) => (theme: ITheme) => ({
  container: {
    width: "100%",
    height: 40,
    maxWidth: 300,
    borderRadius: 1000,
    paddingLeft: 20,
    paddingRight: 10,
    backgroundColor: theme.color11,
    overflow: "hidden",
  } as ViewStyle,
  wrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,
  input: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    color: hasValue ? theme.color8 : theme.color16,
  } as ViewStyle,
});
