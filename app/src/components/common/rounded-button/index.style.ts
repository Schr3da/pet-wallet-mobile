import type {ViewStyle} from "react-native";

export const applyStyles = (
  background: string,
  color: string,
  isDisabled: boolean = false,
) => ({
  container: {
    minWidth: 120,
    borderRadius: 50,
    backgroundColor: background,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    opacity: isDisabled === false ? 1 : 0.4,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    color,
  } as ViewStyle,
});
