import * as React from "react";

import {Text} from "react-native";

import {StyledButton} from "../styled-button";

import {applyStyles} from "./index.style";
import {createStyleWithoutTheme, ThemeTypes, getColors} from "../../../theme";

export interface IProps {
  style: any;
  background: string;
  color: string;
  title: string;
  onPress: () => void;
}

const RoundedButton = (props: IProps) => {
  const {background, color, style, title, onPress} = props;
  const styles = createStyleWithoutTheme(applyStyles(background, color));

  return (
      <StyledButton
        color={background}
        style={{...styles.container, ...style}}
        onPress={onPress}
      >
        <Text style={styles.title}>{title}</Text>
      </StyledButton>
  );
};

export interface IButtonProps {
  theme: ThemeTypes;
  style: any;
  title: string;
  onPress: () => void;
}

export const PrimaryButton = (props: IButtonProps) => {
  const {style, theme, title, onPress} = props;

  const colors = getColors(theme);

  return (
    <RoundedButton
      background={colors.color6}
      color={colors.color3}
      title={title}
      style={style}
      onPress={onPress}
    />
  );
}

export const SecondaryButton = (props: IButtonProps) => {
  const {style, theme, title, onPress} = props;

  const colors = getColors(theme);

  return (
    <RoundedButton
      background={colors.color1}
      color={colors.color4}
      title={title}
      style={style}
      onPress={onPress}
    />
  );
}
