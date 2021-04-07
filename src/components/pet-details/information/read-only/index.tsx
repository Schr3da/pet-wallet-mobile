import * as React from "react";

import {View, Text} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle} from "../../../../theme";
import {InputField, Dialog, ProfileImage, Filters} from "../../../common";
import {ILayoutChildProps} from "../../../common/layout";
import {IPetDto} from "../../../../dto/pets";
import {InputIds, onRemovePet} from "../../../../store/actions/pet-details";
import {onSetErrorCode} from "../../../../store/actions/layout";
import {ErrorTypes, DialogContentTypes} from "../../../../enums/layout";

import {applyStyles} from "../index.style";
import {applySpecificStyles} from "./index.style";
import {ActionBar} from "./action-bar";
import {IFilterDataDto} from "../../../../dto/filters";

const handleRemove = (dispatch: any, id: string | null) =>
  id == null
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : dispatch(onRemovePet(id));

interface IProps extends ILayoutChildProps {
  data: IPetDto;
  filters: IFilterDataDto[];
}

export const ChildView = (props: IProps) => {
  const {data, filters, theme, language, languageType} = props;

  const styles = {
    ...createStyle(theme, applyStyles),
    ...createStyle(theme, applySpecificStyles),
  };

  return (
    <React.Fragment>
      <ProfileImage
        theme={theme}
        isEditing={false}
        image={null}
        style={styles.profile}
      />
      <ActionBar
        language={languageType}
        theme={theme}
        data={data}
        style={styles.actionBar}
      />
      <Filters
        items={filters}
        theme={theme}
        style={styles.filterBar}
        onFilterPressed={() => undefined}
      />
      <View style={styles.contentWrapper}>
        <Text style={styles.headline}>
          {language.petDetails.petDetailsEdit.generalInformationTitle}
        </Text>
        <InputField
          id={InputIds.name}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.name}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.animalType}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.animalType}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
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
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.animalType}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.animalType}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
      </View>
      <View style={styles.contentWrapper}>
        <Text style={styles.headline}>
          {language.petDetails.petDetailsEdit.notesTitle}
        </Text>
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
        <InputField
          id={InputIds.dateOfBirth}
          style={styles.inputField}
          placeholder={language.newPet.newPetInformation.dateOfBirth}
          theme={theme}
          value=""
          disabled={true}
          onChange={() => undefined}
        />
      </View>
    </React.Fragment>
  );
};

export const Dialogs = (props: IProps) => {
  const dispatch = useDispatch();

  const {data, language, theme, dialogContentType} = props;

  const {title, text} = language.dialogs.deletePet;

  switch (dialogContentType) {
    case DialogContentTypes.deletePet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => handleRemove(dispatch, data.id)}
        />
      );
    default:
      return null;
  }
};
