import React, {Dispatch} from "react";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {ILayoutChildProps} from "../../common/layout";
import {onChangeViewComponent, SubViewComponents, ViewComponents} from "../../../store/actions/navigation";
import {createStyle, getColors} from "../../../theme";
import {LanguageTypes} from "../../../language";
import {StyledButton} from "../../common";

import {applyStyles} from './index.style';

const addNewPet = (
  dispatch: Dispatch<any>,
  language: LanguageTypes
) => { 
  dispatch(onChangeViewComponent(
    ViewComponents.newPet,
    SubViewComponents.newPetInformation,
    language,
  ));
}

export const AddPetBar = (props: ILayoutChildProps): JSX.Element =>  {
  const {theme, language, languageType, hasPets} = props; 

  const dispatch = useDispatch();

  const styles = createStyle(theme, applyStyles); 
  const colors = getColors(theme);

  let {button, description}= hasPets ? 
    language.welcome.welcomeWithPets.addPetBar :
    language.welcome.welcomeNoPets.addPetBar;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{description}</Text>
      <StyledButton
        color={colors.color3}
        style={styles.button}
        title={button}
        onPress={() => addNewPet(dispatch, languageType)}
      />
  </View>
  );
};
