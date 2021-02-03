import {Animated} from "react-native";

import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

const cardHeight = 130;

export const applyStyles = (dataLength: number) => (_: ITheme) => {
  const containerHeight = cardHeight * 2 + cardHeight * 0.5;

  return {
    container: {
      width: "100%",
      height: dataLength <= 2 ? cardHeight * dataLength : containerHeight,
      maxWidth: 380,
      marginTop: 18,
      marginBottom: 20,
      alignItems: "center",
    } as ViewStyle,
    list: {
      width: "100%",
    } as ViewStyle,
  };
};

export const animatedCardStyle = (
  index: number,
  length: number,
  animation: Animated.Value,
) => {
  const containerHeight = cardHeight * length;

  const isLast = length > 1 && length - 1 === index;

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
    opacity,
    marginBottom: isLast ? cardHeight * 1.5 : 10,
    transform: [translateY, scale],
  };
};
