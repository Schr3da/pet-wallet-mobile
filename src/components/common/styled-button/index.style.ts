import {ViewStyle} from "react-native";

export const applyStyles = (
  color: string
) => ({ 
  container: {
    display: "flex",
    alignItems: "center",
  } as ViewStyle,
  text: {
    fontWeight: "bold",
    fontSize: 12,
    color,
  } as ViewStyle
});
