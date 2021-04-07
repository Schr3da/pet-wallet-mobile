import * as React from "react";

import {View, Text} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle} from "../../../../theme";
import {
  InputField,
  InputTypeField,
  Dialog,
  ProfileImage,
  Filters,
} from "../../../common";
import {InputValues} from "../../../../enums/input";
import {ILayoutChildProps} from "../../../common/layout";
import {SecondaryButton, PrimaryButton} from "../../../common/rounded-button";
import {IPetDto} from "../../../../dto/pets";

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
} from "../../../../store/actions/pet-details";

import {applyStyles} from "../index.style";
import {IFilterDataDto} from "../../../../dto/filters";

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => undefined;

interface IProps extends ILayoutChildProps {
  data: IPetDto;
  filters: IFilterDataDto[];
}

export const ChildView = (props: IProps) => {
  const dispatch = useDispatch();

  const {filters, data, theme, language, languageType} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <React.Fragment>
      <ProfileImage
        theme={theme}
        isEditing={true}
        image={null}
        style={styles.profile}
      />
      <Filters
        items={filters}
        theme={theme}
        style={styles.filterBar}
        onFilterPressed={() => undefined}
      />
      <View style={styles.contentWrapper}>
        <Text style={{...styles.headline}}>
          {language.petDetails.petDetailsEdit.generalInformationTitle}
        </Text>
        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          onChange={(id: string, value: InputValues) =>
            handleInputChange(id, value, dispatch)
          }
        />
        <InputTypeField
          id={InputIds.animalType}
          style={styles.inputField}
          theme={theme}
          inputType={InputTypes.picker}
          placeholder=""
          value=""
        />
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          theme={theme}
          language={languageType}
          inputType={InputTypes.date}
          placeholder=""
          value=""
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.headline}>
          {language.petDetails.petDetailsEdit.medicalTitle}
        </Text>
        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          onChange={(id: string, value: InputValues) =>
            handleInputChange(id, value, dispatch)
          }
        />
        <InputTypeField
          id={InputIds.animalType}
          style={styles.inputField}
          theme={theme}
          inputType={InputTypes.picker}
          placeholder=""
          value=""
        />
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          theme={theme}
          language={languageType}
          inputType={InputTypes.date}
          placeholder=""
          value=""
        />

        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          onChange={(id: string, value: InputValues) =>
            handleInputChange(id, value, dispatch)
          }
        />
        <InputTypeField
          id={InputIds.animalType}
          style={styles.inputField}
          theme={theme}
          inputType={InputTypes.picker}
          placeholder=""
          value=""
        />
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          theme={theme}
          language={languageType}
          inputType={InputTypes.date}
          placeholder=""
          value=""
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.headline}>
          {language.petDetails.petDetailsEdit.notesTitle}
        </Text>
        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          onChange={(id: string, value: InputValues) =>
            handleInputChange(id, value, dispatch)
          }
        />
        <InputTypeField
          id={InputIds.animalType}
          style={styles.inputField}
          theme={theme}
          inputType={InputTypes.picker}
          placeholder=""
          value=""
        />
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          theme={theme}
          language={languageType}
          inputType={InputTypes.date}
          placeholder=""
          value=""
        />

        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          onChange={(id: string, value: InputValues) =>
            handleInputChange(id, value, dispatch)
          }
        />
        <InputTypeField
          id={InputIds.animalType}
          style={styles.inputField}
          theme={theme}
          inputType={InputTypes.picker}
          placeholder=""
          value=""
        />
        <InputTypeField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          theme={theme}
          language={languageType}
          inputType={InputTypes.date}
          placeholder=""
          value=""
        />
      </View>
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
        onPress={() => undefined}
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
