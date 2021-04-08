import type {ViewStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    alignItems: "center",
    marginBottom: 150,
  } as ViewStyle,
  item: {
    height: 40,
    marginBottom: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  } as ViewStyle,
  checkbox: {
    flexBasis: 30,
  } as ViewStyle,
  input: {
    flex: 1,
  } as ViewStyle,
  actionWrapper: {
    position: "absolute",
    height: "100%",
    paddingLeft: 20,
    right: 14,
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    backgroundColor: theme.color11,
  } as ViewStyle,
  addButton: {
    minWidth: 40,
  } as ViewStyle,
});
