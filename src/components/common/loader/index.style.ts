import type {ImageStyle, ViewStyle} from "react-native";
import Animated from "react-native-reanimated";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.color1,
  } as ViewStyle,
  loader: {
    width: 62,
    height: 44,
    backgroundColor: theme.color2, 
    borderRadius: 10,
    overflow: "hidden",
  } as ViewStyle,
  page: (color: string, topValue: number) => ({
    position: "absolute",
    top: topValue,
    left: 1,
    right: 1,
    height: 40,
    backgroundColor: color, 
    borderRadius: 10,
  } as ViewStyle),
  footer: {
    position: "absolute",
    width: "100%",
    height: 18,
    bottom: 0,
  } as ImageStyle,
});

export const applyPageStyles = (
  color: string,
  value: Animated.Value<number>,
): Animated.AnimateProps<any, any> => {
  return {
    position: "absolute",
    top: 0,
    left: 1,
    right: 1,
    height: 40,
    backgroundColor: color, 
    borderRadius: 10,
    transform: [{
      translateY: value
    }]
  };
};