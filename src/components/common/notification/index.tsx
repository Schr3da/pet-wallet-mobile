import React from "react";

import {Text, View} from "react-native";

import {createStyle, getColors, ThemeTypes} from "../../../theme";

import {StyledButton} from "../styled-button";

import {applyStyles} from './index.style';

export interface IProps {
  description: string;
  buttonText: string;
  theme: ThemeTypes;
  color: string;
  style?: any;
  onPress: () => void;
}

export const Notification = (props: IProps): JSX.Element =>  {
  const {buttonText, color, description, style, theme, onPress} = props; 

  const styles = createStyle(theme, applyStyles(color)); 
  const colors = getColors(theme);

  return (
    <View style={{...styles.container, ...(style || {})}}>
      <Text style={styles.text}>{description}</Text>
      <StyledButton
        color={colors.color9}
        style={styles.button}
        title={buttonText}
        onPress={() => onPress()}
      />
  </View>
  );
};
