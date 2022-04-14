import * as React from "react";

import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {createStyle, ThemeTypes} from "../../../../theme";
import {
  InputField,
  Dialog,
  ProfileImage,
  Filters,
  InputTypeField,
  TextAreaField,
  MedicineInfo,
  NoData,
} from "../../../common";
import {ILayoutChildProps} from "../../../common/layout";
import {onRemovePet} from "../../../../store/actions/pet-details";
import {onSetErrorCode} from "../../../../store/actions/layout";
import {
  ErrorTypes,
  DialogContentTypes,
  InputTypes,
} from "../../../../enums/layout";
import {ActionBar} from "./action-bar";
import {InputValues, InputIds} from "../../../../enums/input";

import {applyStyles} from "../index.style";
import {applySpecificStyles} from "./index.style";
import {ICombinedReducerState} from "../../../../store/reducers";
import {
  getInputData,
  inputValueEmpty,
  collectionIsEmpty,
} from "../../../common/utils";
import {FilterTypes} from "../../../../enums/filters";

const handleRemove = (dispatch: any, id: string | null) =>
  id == null
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : dispatch(onRemovePet(id));

interface IProps extends ILayoutChildProps {
  id: string;
}

const stateToProps = (state: ICombinedReducerState) => ({
  inputs: getInputData<{[key: string]: InputValues}>(state),
  filters: state.filters.petDetails.none,
  data: state.pets.data.find((d) => d.id === state.pets.selectedId)!,
  notes: state.petDetails.notes,
  scans: state.petDetails.scans,
});

export const ChildView = (props: IProps) => {
  const {data, filters, inputs, notes, scans} = useSelector(stateToProps);

  const {id, theme, language, languageType} = props;

  const styles = {
    ...createStyle(theme, applyStyles),
    ...createStyle(theme, applySpecificStyles),
  };

  const selectedFilter = filters.find((f) => f.isSelected);
  const filterId =
    selectedFilter == null ? FilterTypes.generalOnly : selectedFilter.id;

  return (
    <React.Fragment>
      <ProfileImage
        theme={theme}
        isEditing={false}
        image={data.profileImage || null}
        style={styles.profile}
      />
      <ActionBar
        id={id}
        language={languageType}
        theme={theme}
        style={styles.actionBar}
      />
      <Filters items={filters} theme={theme} style={styles.filterBar} />
      {filterId === FilterTypes.generalOnly && (
        <View style={styles.contentWrapper}>
          <InputField
            id={InputIds.name}
            style={styles.inputField}
            theme={theme}
            value={inputs[InputIds.name]}
            disabled={true}
            tag={language.newPet.newPetInformation.name}
            onChange={() => undefined}
          />
          <InputTypeField
            id={InputIds.animalType}
            inputType={InputTypes.picker}
            style={styles.inputField}
            tag={language.newPet.newPetInformation.animalType}
            theme={theme}
            disabled={true}
            value={inputs[InputIds.animalType]}
          />
          <InputTypeField
            id={InputIds.dateOfBirth}
            inputType={InputTypes.date}
            style={styles.inputField}
            tag={language.newPet.newPetInformation.dateOfBirth}
            theme={theme}
            disabled={true}
            value={inputs[InputIds.dateOfBirth]}
          />
          {notes.length === 0 ? (
            <TextAreaField
              id={InputIds.notes}
              style={styles.inputField}
              tag={language.petDetails.none.notesTitle}
              theme={theme}
              disabled={true}
              value={inputs[InputIds.notes]}
              onChange={() => undefined}
            />
          ) : (
            notes.map((n) => (
              <TextAreaField
                id={n.id}
                key={n.id}
                style={styles.inputField}
                tag={language.petDetails.none.notesTitle}
                theme={theme}
                disabled={true}
                value={inputs[n.id]}
                onChange={() => undefined}
              />
            ))
          )}
        </View>
      )}
      {filterId === FilterTypes.medicalOnly && (
        <View style={styles.contentWrapper}>
          {collectionIsEmpty(scans) ? (
            <NoData
              image={
                theme === ThemeTypes.Dark
                  ? require("../../../../../assets/png/dark/no-vaccine.png")
                  : require("../../../../../assets/png/light/no-vaccine.png")
              }
              title={language.petDetails.none.noVaccinationData}
              theme={theme}
              disableNotification={true}
              style={styles.noData}
            />
          ) : (
            scans.map((s) => (
              <MedicineInfo
                key={s.id}
                id={s.id}
                style={styles.inputField}
                tag={s.title}
                theme={theme}
                numberOfLines={14}
                disabled={true}
                value={
                  inputValueEmpty(s.description)
                    ? language.petDetails.none.noMedicineDescription
                    : s.description
                }
              />
            ))
          )}
        </View>
      )}
    </React.Fragment>
  );
};

export const Dialogs = (props: IProps) => {
  const dispatch = useDispatch();

  const {id, language, theme, dialogContentType} = props;

  const {title, text} = language.dialogs.deletePet;

  switch (dialogContentType) {
    case DialogContentTypes.deletePet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => handleRemove(dispatch, id)}
        />
      );
    default:
      return null;
  }
};
