import {ILayoutChildProps} from "components/common/layout";

import React, {Dispatch} from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, ViewComponents} from "../../../store/actions/general";

import {createStyle, getColors} from "../../../theme";

import {StyledButton} from "../../common";

import {applyStyles} from './index.style';

const addNewPet = (dispatch: Dispatch<any>) => { 
  dispatch(onChangeViewComponent(ViewComponents.newPet));
}

export const AddPetBar = (props: ILayoutChildProps): JSX.Element =>  {
  const {theme, language} = props; 

  const dispatch = useDispatch();

  const styles = createStyle(theme, applyStyles); 
  const colors = getColors(theme);

  return (
    <View style={styles.container as any}>
      <Text style={styles.text}>
        {language.welcome.addPetBar.description}
      </Text>
      <StyledButton
        color={colors.color3}
        style={styles.button}
        title={language.welcome.addPetBar.button}
        onPress={() => addNewPet(dispatch)}
      />
  </View>
  );
};
