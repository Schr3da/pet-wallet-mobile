import React, {Dispatch} from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {ILayoutChildProps} from "../../common/layout";

import {onChangeViewComponent, SubViewComponents, ViewComponents} from "../../../store/actions/layout";

import {createStyle, getColors} from "../../../theme";

import {StyledButton} from "../../common";

import {applyStyles} from './index.style';

const addNewPet = (dispatch: Dispatch<any>) => { 
  dispatch(onChangeViewComponent(
    ViewComponents.newPet,
    SubViewComponents.newPetType
  ));
}

export const AddPetBar = (props: ILayoutChildProps): JSX.Element =>  {
  const {theme, language, hasPets} = props; 

  const dispatch = useDispatch();

  const styles = createStyle(theme, applyStyles); 
  const colors = getColors(theme);

  let {button, description}= hasPets ? 
    language.welcome.welcomeWithPets.addPetBar :
    language.welcome.welcomeNoPets.addPetBar;

  return (
    <View style={styles.container as any}>
      <Text style={styles.text}>{description}</Text>
      <StyledButton
        color={colors.color3}
        style={styles.button}
        title={button}
        onPress={() => addNewPet(dispatch)}
      />
  </View>
  );
};
