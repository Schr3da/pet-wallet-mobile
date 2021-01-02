import React, {Dispatch} from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, ViewComponents} from "../../../store/actions/general";
import {createStyle, getColors, ThemeTypes} from "../../../theme";
import {StyledButton} from "../../common";

import {applyStyles} from './index.style';

interface IProps {
  theme: ThemeTypes
}

const addNewPet = (dispatch: Dispatch<any>) => 
  dispatch(onChangeViewComponent(ViewComponents.newPet));

export const BottomBar = (props: IProps): JSX.Element =>  {
  const {theme} = props; 

  const dispatch = useDispatch();

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
        onPress={() => addNewPet(dispatch)}
      />
    
  </View>
  );
};
