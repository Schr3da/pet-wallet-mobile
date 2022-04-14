import {Animated} from "react-native";

import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 380,
  },
  footer: {
    maxWidth: 380,
    position: "relative",
    backgroundColor: theme.color1,
  } as ViewStyle,
  addPetBar: {
    marginTop: 10,
    borderRadius: 100,
  } as ViewStyle,
});

const cardHeight = 130;

export const animatedCardStyle = (
  index: number,
  length: number,
  animation: Animated.Value,
) => {
  const containerHeight = cardHeight * length;

  const isLast = length - 1 === index;

  const translateY = {
    translateY: Animated.add(
      animation,
      animation.interpolate({
        inputRange: [0, 0.00001 + index * cardHeight],
        outputRange: [0, -index * cardHeight],
        extrapolate: "clamp",
      }),
    ),
  };

  const position = Animated.subtract(index * cardHeight, animation);

  const scale = {
    scale: position.interpolate({
      inputRange: [-cardHeight, 0, containerHeight, containerHeight],
      outputRange: [0.8, 1, 1, 0.8],
      extrapolate: "clamp",
    }),
  };

  const opacity = position.interpolate({
    inputRange: [-cardHeight, 0, containerHeight, containerHeight],
    outputRange: [0.5, 1, 1, 0.5],
  });

  return {
    width: "100%",
    alignItems: "center",
    opacity,
    marginBottom: isLast ? cardHeight * 1.5 : 10,
    transform: [translateY, scale],
  } as Animated.WithAnimatedObject<ViewStyle>;
};
