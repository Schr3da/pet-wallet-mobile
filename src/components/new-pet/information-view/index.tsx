import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";
import {createStyle, ThemeTypes} from "../../../theme";
import {ICombinedReducerState} from "../../../store/reducers";
import {handleInputChange, handleError, requestCancel} from "../hooks";
import {base64ImageToUri, inputValueEmpty} from "../../common/utils";
import {IImageDataDto} from "../../../dto/image";

import {
  InputTypeField,
  Dialog,
  ImagePicker,
  InputField,
  RoundedButtons,
} from "../../common";
import {
  InputIds,
  InputValues,
  onProfileImage,
  onCreateNewPet,
  onCancelNewPet,
} from "../../../store/actions/new-pet";

import {
  ErrorTypes,
  InputTypes,
  DialogContentTypes,
} from "../../../enums/layout";

import {applyStyles} from "./index.style";

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
  profile: IImageDataDto | null;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  inputs: state.newPet.inputs,
  profile: state.newPet.profile,
});

const handleProfileImage = (dispatch: any, data: IImageDataDto) =>
  dispatch(onProfileImage(data));

export const ChildView = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {profile} = stateProps;

  const {theme, language, languageType} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <React.Fragment>
      {profile == null ? (
        <Image
          style={styles.placeholderIcon}
          source={
            theme === ThemeTypes.Light
              ? require("../../../../assets/png/light/new-pet-profile-icon.png")
              : require("../../../../assets/png/dark/new-pet-profile-icon.png")
          }
        />
      ) : (
        <Image style={styles.profileImage} source={base64ImageToUri(profile)} />
      )}
      <ImagePicker
        style={styles.picker}
        theme={theme}
        maxWidth={512}
        maxHeight={512}
        onError={() => handleError(dispatch, ErrorTypes.photoLibrary)}
        onData={(data: IImageDataDto) => handleProfileImage(dispatch, data)}
      />
      <InputField
        id={InputIds.name}
        style={styles.inputField}
        placeholder={language.newPet.newPetInformation.name}
        theme={theme}
        value={stateProps.inputs[InputIds.name]}
        onChange={(id: string, value: InputValues) =>
          handleInputChange(id, value, dispatch)
        }
      />
      <InputTypeField
        id={InputIds.animalType}
        style={styles.inputField}
        theme={theme}
        inputType={InputTypes.picker}
        placeholder={language.newPet.newPetInformation.animalType}
        value={stateProps.inputs[InputIds.animalType]}
      />
      <InputTypeField
        id={InputIds.dateOfBirth}
        style={styles.inputField}
        theme={theme}
        language={languageType}
        inputType={InputTypes.date}
        placeholder={language.newPet.newPetInformation.dateOfBirth}
        value={stateProps.inputs[InputIds.dateOfBirth]}
      />
    </React.Fragment>
  );
};

const footerStateToProps = (state: ICombinedReducerState) => {
  const {name, animal, dateOfBirth} = state.newPet.inputs;

  const canContinue =
    inputValueEmpty(name) === false &&
    inputValueEmpty(animal) === false &&
    inputValueEmpty(dateOfBirth) === false;

  return {canContinue};
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {canContinue} = useSelector(footerStateToProps);

  const {language, theme} = props;

  return (
    <React.Fragment>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetInformation.primaryButton}
        style={{marginTop: 10}}
        isDisabled={canContinue === false}
        onPress={() => dispatch(onCreateNewPet())}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPetInformation.secondaryButton}
        style={{marginTop: 4}}
        onPress={() => requestCancel(dispatch)}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, languageType, hasPets, theme, dialogContentType} = props;
  const {title, text} = language.dialogs.deleteAttachment;

  switch (dialogContentType) {
    case DialogContentTypes.cancelNewPet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => dispatch(onCancelNewPet(languageType, hasPets))}
        />
      );
    default:
      return null;
  }
};
