import * as React from "react";

import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {createStyle} from "../../../../theme";
import {InputValues} from "../../../../enums/input";
import {ILayoutChildProps} from "../../../common/layout";
import {SecondaryButton, PrimaryButton} from "../../../common/rounded-button";
import {ICombinedReducerState} from "../../../../store/reducers";
import {getInputData} from "../../../common/utils";
import {FilterTypes} from "../../../../enums/filters";
import {onInputChange} from "../../../../store/actions/inputs";

import {
  InputField,
  InputTypeField,
  Dialog,
  ProfileImage,
  Filters,
  TextAreaField,
  DataList,
} from "../../../common";

import {
  ErrorTypes,
  InputTypes,
  DialogContentTypes,
} from "../../../../enums/layout";

import {
  onSetErrorCode,
  onSetDialogContentType,
} from "../../../../store/actions/layout";

import {
  InputIds,
  onCancelPetDetailsEdit,
  onProfileImage,
  onSave,
} from "../../../../store/actions/pet-details";

import {applyStyles} from "../index.style";

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

const stateToProps = (state: ICombinedReducerState) => ({
  inputs: getInputData<{[key: string]: InputValues}>(state),
  filters: state.filters.petDetails.petDetailsEdit,
  data: state.pets.data.find((d) => d.id === state.pets.selectedId)!,
  newProfile: state.petDetails.newProfile,
});

interface IProps extends ILayoutChildProps {
  id: string;
}

export const ChildView = (props: IProps) => {
  const dispatch = useDispatch();

  const {data, filters, inputs, newProfile} = useSelector(stateToProps);

  const {theme, language, languageType} = props;

  const styles = createStyle(theme, applyStyles);

  const selectedFilter = filters.find((f) => f.isSelected);

  const filterId =
    selectedFilter == null ? FilterTypes.generalOnly : selectedFilter.id;

  return (
    <React.Fragment>
      <ProfileImage
        theme={theme}
        isEditing={true}
        image={newProfile || data.profileImage || null}
        style={{...styles.profile, marginBottom: 2}}
        onNewImage={(data) => dispatch(onProfileImage(data))}
      />
      <Filters items={filters} theme={theme} style={styles.filterBar} />
      {filterId === FilterTypes.generalOnly && (
        <View style={styles.contentWrapper}>
          <InputField
            id={InputIds.name}
            style={styles.inputField}
            tag={language.newPet.newPetInformation.name}
            theme={theme}
            value={inputs[InputIds.name]}
            onChange={(id, value) => dispatch(onInputChange(id, value))}
          />
          <InputTypeField
            id={InputIds.animalType}
            inputType={InputTypes.picker}
            style={styles.inputField}
            tag={language.newPet.newPetInformation.animalType}
            theme={theme}
            value={inputs[InputIds.animalType]}
          />
          <InputTypeField
            id={InputIds.dateOfBirth}
            inputType={InputTypes.date}
            style={styles.inputField}
            tag={language.newPet.newPetInformation.dateOfBirth}
            theme={theme}
            value={inputs[InputIds.dateOfBirth]}
          />
          <TextAreaField
            id={InputIds.notes}
            style={{...styles.inputField, marginBottom: 100}}
            tag={language.petDetails.none.notesTitle}
            theme={theme}
            value={inputs[InputIds.notes]}
            onChange={(id, value) => dispatch(onInputChange(id, value))}
          />
        </View>
      )}
      {filterId === FilterTypes.medicalOnly && (
        <View style={styles.contentWrapper}>
          <DataList
            style={{}}
            theme={theme}
            language={languageType}
            data={[
              {
                id: "1",
                value: "asdasd",
                isSelected: true,
                type: InputTypes.text,
              },
              {
                id: "2",
                value: "asdasd",
                isSelected: true,
                type: InputTypes.text,
              },
              {
                id: "3",
                value: "asdasd",
                isSelected: true,
                type: InputTypes.text,
              },
            ]}
            inputs={inputs}
            onAdd={() => undefined}
            onSelect={() => undefined}
            onChange={() => undefined}
          />
        </View>
      )}
    </React.Fragment>
  );
};

export const requestCancel = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.cancelEditPetDetails));

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme} = props;

  return (
    <React.Fragment>
      <SecondaryButton
        theme={theme}
        title={language.scanResult.secondaryButton}
        onPress={() => requestCancel(dispatch)}
      />
      <PrimaryButton
        theme={theme}
        title={language.scanResult.primaryButton}
        onPress={() => dispatch(onSave())}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme, dialogContentType} = props;

  const {title, text} = language.dialogs.cancelEditPetDetails;

  switch (dialogContentType) {
    case DialogContentTypes.cancelEditPetDetails:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => dispatch(onCancelPetDetailsEdit)}
        />
      );
    default:
      return null;
  }
};
