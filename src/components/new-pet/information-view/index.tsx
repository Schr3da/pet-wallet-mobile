import * as React from "react";

import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";
import {createStyle} from "../../../theme";
import {ICombinedReducerState} from "../../../store/reducers";
import {handleInputChange, requestCancel} from "../hooks";
import {inputValueEmpty, getInputData} from "../../common/utils";
import {IImageDataDto} from "../../../dto/image";

import {
  InputTypeField,
  Dialog,
  InputField,
  RoundedButtons,
  ProfileImage,
} from "../../common";

import {
  InputIds,
  onProfileImage,
  onCreateNewPet,
  onCancelNewPet,
} from "../../../store/actions/new-pet";

import {InputTypes, DialogContentTypes} from "../../../enums/layout";

import {applyStyles} from "./index.style";
import {InputValues} from "../../../enums/input";

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
  profile: IImageDataDto | null;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  inputs: getInputData(state),
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
      <ProfileImage
        image={profile}
        isEditing={true}
        theme={theme}
        style={styles.profile}
        onNewImage={(data) => handleProfileImage(dispatch, data)}
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
  const {name, animal, dateOfBirth} = getInputData(state);

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
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPetInformation.secondaryButton}
        onPress={() => requestCancel(dispatch)}
      />
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetInformation.primaryButton}
        isDisabled={canContinue === false}
        onPress={() => dispatch(onCreateNewPet())}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme, dialogContentType} = props;
  const {title, text} = language.dialogs.deleteAttachment;

  switch (dialogContentType) {
    case DialogContentTypes.cancelNewPet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => dispatch(onCancelNewPet())}
        />
      );
    default:
      return null;
  }
};
