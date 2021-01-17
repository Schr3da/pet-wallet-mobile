import React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImagePicker, InputField, RoundedButtons} from "../../common";
import {InputIds, InputValues} from "../../../store/actions/new-pet";
import {ICombinedReducerState} from "../../../store/reducers";
import {handleInputChange, handleChangeSubView, handleCancelNewPet} from "../hooks";

import {applyStyles} from "./index.style";
import {SubViewComponents} from "../../../store/actions/navigation";
import {getTranslation} from "../../../language";

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  inputs: state.newPet.inputs,
});

export const InformationView = (
  props: ILayoutChildProps
) => {

  const dispatch = useDispatch();
  
  const stateProps = useSelector(stateToProps);

  const {hasPets, theme, languageType} = props;
  const styles = createStyle(theme, applyStyles); 

  const translation = getTranslation(languageType);

  return (
    <React.Fragment>
      <Image
        style={styles.placeholderIcon}
        source={theme === ThemeTypes.Light ? 
          require("../../../../assets/png/light/new-pet-profile-icon.png") :
          require("../../../../assets/png/dark/new-pet-profile-icon.png")
        }
        />
      <ImagePicker 
        style={styles.picker}
        theme={theme}
      />
      <InputField 
        id={InputIds.name}
        style={styles.inputField}
        placeholder="Name"
        theme={theme}
        value={stateProps.inputs[InputIds.name]}
        onChange={(id, value) => handleInputChange(id, value, dispatch)}
      />
      <InputField 
        id={InputIds.race}
        style={styles.inputField}
        placeholder="Race"
        theme={theme}
        value={stateProps.inputs[InputIds.race]}
        onChange={(id, value) => handleInputChange(id, value, dispatch)}
      />
      <View style={styles.row}>
        <InputField 
          id={InputIds.dateOfBirth}
          style={styles.dateOfBirth}
          placeholder="Date of birth"
          theme={theme}
          value={stateProps.inputs[InputIds.dateOfBirth]}
          onChange={(id, value) => handleInputChange(id, value, dispatch)}
        />
        <InputField 
          id={InputIds.age}
          style={styles.age}
          placeholder="Age"
          theme={theme}
          value={stateProps.inputs[InputIds.age]}
          onChange={(id, value) => handleInputChange(id, value, dispatch)}
        />
      </View>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={translation.newPet.newPetInformation.primaryButton}
        style={{marginTop: 20}}
        onPress={() => handleChangeSubView(dispatch, SubViewComponents.newPetScan, languageType)}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={translation.newPet.newPetInformation.secondaryButton}
        style={{marginTop: 10}}
        onPress={() => handleCancelNewPet(dispatch, languageType, hasPets)}
        />
      </React.Fragment>
  );
}
