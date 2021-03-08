import * as React from "react";

import {Text, ViewStyle} from "react-native";

import {StyledButton} from "../styled-button";

import {applyStyles} from "./index.style";
import {createStyleWithoutTheme, ThemeTypes, getColors} from "../../../theme";

const handlePress = (
  isDisabled: boolean | undefined,
  didPress: boolean | undefined,
  action: () => void,
) => () => {
  if (isDisabled || didPress) {
    return;
  }
  action();
};

export interface IProps {
  style: ViewStyle;
  background: string;
  color: string;
  title: string;
  didPress?: boolean;
  isDisabled?: boolean;
  onPress: () => void;
}

const RoundedButton = (props: IProps) => {
  const {
    background,
    color,
    didPress,
    isDisabled,
    style,
    title,
    onPress,
  } = props;
  const styles = createStyleWithoutTheme(
    applyStyles(background, color, isDisabled),
  );

  return (
    <StyledButton
      color={background}
      style={{...styles.container, ...style}}
      onPress={handlePress(isDisabled, didPress, onPress)}>
      <Text style={styles.title}>{title}</Text>
    </StyledButton>
  );
};

export interface IButtonProps {
  theme: ThemeTypes;
  title: string;
  style?: ViewStyle;
  isDisabled?: boolean;
  didPress?: boolean;
  onPress: () => void;
}

export const PrimaryButton = (props: IButtonProps) => {
  const {didPress, isDisabled, style, theme, title, onPress} = props;

  const colors = getColors(theme);

  return (
    <RoundedButton
      background={colors.color6}
      color={colors.color3}
      title={title}
      style={style || {}}
      isDisabled={isDisabled}
      onPress={handlePress(isDisabled, didPress, onPress)}
    />
  );
};

export const SecondaryButton = (props: IButtonProps) => {
  const {didPress, isDisabled, style, theme, title, onPress} = props;

  const colors = getColors(theme);

  return (
    <RoundedButton
      background={colors.color1}
      color={colors.color4}
      title={title}
      style={style || {}}
      isDisabled={isDisabled}
      onPress={handlePress(isDisabled, didPress, onPress)}
    />
  );
};
