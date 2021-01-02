import React from "react";

import {Text, View} from "react-native";

import {createStyle, getColors, ThemeTypes} from "../../../theme";

import {StyledButton} from "../../common";

import {applyStyles} from './index.style';

interface IProps {
  theme: ThemeTypes
}

export const BottomBar = (props: IProps): JSX.Element =>  {
  const {theme} = props; 

  const styles = createStyle(theme, applyStyles); 
  const colors = getColors(theme);

  return (
    <View style={styles.container as any}>
      <Text style={styles.text}>
        Füge ein Haustier zu deiner 
        persönlichen Pet Wallet hinzu.
      </Text>
      
      <StyledButton
        color={colors.color3}
        style={styles.button}
        title="Hinzufügen"
        onPress={() => undefined}
      />
    
  </View>
  );
};
