import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
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
  IImageData,
  onProfileImage,
} from "../../../store/actions/new-pet";
import {ICombinedReducerState} from "../../../store/reducers";
import {
  handleInputChange,
  handleChangeSubView,
  handleCancelNewPet,
  handleError,
  requestCancel,
} from "../hooks";
import {SubViewComponents} from "../../../store/actions/navigation";
import {
  DialogContentTypes,
  ErrorTypes,
  InputTypes,
} from "../../../store/actions/layout";
import {base64ImageToUri} from "../../common/utils";

import {applyStyles} from "./index.style";

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
  profile: IImageData | null;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  inputs: state.newPet.inputs,
  profile: state.newPet.profile,
});

const handleProfileImage = (dispatch: any, data: IImageData) =>
  dispatch(onProfileImage(data));

export const ChildView = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {profile} = stateProps;

  const {theme, language} = props;
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
        onData={(data) => handleProfileImage(dispatch, data)}
      />
      <InputField
        id={InputIds.name}
        style={styles.inputField}
        placeholder={language.newPet.newPetInformation.name}
        theme={theme}
        value={stateProps.inputs[InputIds.name]}
        onChange={(id, value) => handleInputChange(id, value, dispatch)}
      />
      <InputTypeField
        id={InputIds.animalType}
        style={styles.inputField}
        theme={theme}
        inputType={InputTypes.picker}
        placeholder={language.newPet.newPetInformation.animalType}
        value={stateProps.inputs[InputIds.animalType]}
      />
      <View style={styles.row}>
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.dateOfBirth}
          theme={theme}
          inputType={InputTypes.date}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          value={stateProps.inputs[InputIds.dateOfBirth]}
        />
        <InputField
          id={InputIds.age}
          style={styles.age}
          placeholder={language.newPet.newPetInformation.age}
          theme={theme}
          type="numeric"
          value={stateProps.inputs[InputIds.age]}
          onChange={(id, value) => handleInputChange(id, value, dispatch)}
        />
      </View>
    </React.Fragment>
  );
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, languageType, theme} = props;

  return (
    <React.Fragment>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetInformation.primaryButton}
        style={{marginTop: 10}}
        onPress={() =>
          handleChangeSubView(
            dispatch,
            SubViewComponents.newPetScan,
            languageType,
          )
        }
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
          onPress={() => handleCancelNewPet(dispatch, languageType, hasPets)}
        />
      );
    default:
      return null;
  }
};
