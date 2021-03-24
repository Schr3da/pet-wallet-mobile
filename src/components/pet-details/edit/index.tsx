import * as React from "react";

import {View, Image, Text} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImagePicker, InputField, InputTypeField} from "../../common";

import {base64ImageToUri} from "../../common/utils";
import {ErrorTypes, InputTypes} from "../../../enums/layout";
import {IImageDataDto} from "../../../dto/image";
import {InputValues} from "../../../enums/input";
import {onSetErrorCode} from "../../../store/actions/layout";
import {InputIds} from "../../../store/actions/pet-details";
import {ILayoutChildProps} from "../../common/layout";
import {SecondaryButton, PrimaryButton} from "../../common/rounded-button";
import {IPetDto} from "../../../dto/pets";

import * as EditStyles from "./index.style";

import {applyStyles} from "../index.style";

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => undefined;

interface IProps extends ILayoutChildProps {
  data: IPetDto;
}

export const EditView = (props: IProps) => {
  const dispatch = useDispatch();

  const {data, theme, language, languageType} = props;

  const styles = createStyle(theme, applyStyles);
  const editStyles = createStyle(theme, EditStyles.applyStyles);

  return (
    <React.Fragment>
      {data == null ? (
        <Image
          style={styles.placeholderIcon}
          source={
            theme === ThemeTypes.Light
              ? require("../../../../assets/png/light/new-pet-profile-icon.png")
              : require("../../../../assets/png/light/new-pet-profile-icon.png")
          }
        />
      ) : (
        <Image style={styles.profileImage} source={base64ImageToUri(null)} />
      )}
      <ImagePicker
        style={editStyles.picker}
        theme={theme}
        maxWidth={512}
        maxHeight={512}
        onError={() => handleError(dispatch, ErrorTypes.photoLibrary)}
        onData={(_: IImageDataDto) => undefined}
      />
      <View style={styles.contentWrapper}>
        <Text style={{...styles.headline}}>
          {language.petDetails.generalInformationTitle}
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
        <Text style={styles.headline}>{language.petDetails.medicalTitle}</Text>
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
        <Text style={styles.headline}>{language.petDetails.notesTitle}</Text>
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

export const requestCancel = (dispatch: any) => undefined;

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