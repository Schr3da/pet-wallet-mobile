import * as React from "react";

import {View, Image, Text} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputField} from "../../common";

import {base64ImageToUri} from "../../common/utils";
import {
  InputIds,
  togglePetDetailsMode,
} from "../../../store/actions/pet-details";
import {ILayoutChildProps} from "../../common/layout";
import {IPetDto} from "../../../dto/pets";
import {ImageButton} from "../../common/image-button";
import {onSharePet} from "../../../store/actions/pets";

import {applyStyles} from "../index.style";
import {applySpecificStyles} from "./index.style";
import {onSetErrorCode} from "../../../store/actions/layout";
import {ErrorTypes} from "../../../enums/layout";

const handleToggleMode = (dispatch: any) => dispatch(togglePetDetailsMode());

const handleShare = (dispatch: any, id: string | null) =>
  id === null
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : dispatch(onSharePet(id));

interface IProps extends ILayoutChildProps {
  data: IPetDto;
}

export const ReadOnlyView = (props: IProps) => {
  const dispatch = useDispatch();

  const {data, theme, language} = props;

  const styles = {
    ...createStyle(theme, applyStyles),
    ...createStyle(theme, applySpecificStyles),
  };

  return (
    <React.Fragment>
      {true || data == null ? (
        <Image
          style={styles.placeholderIcon}
          source={
            theme === ThemeTypes.Light
              ? require("../../../../assets/png/light/new-pet-profile-icon.png")
              : require("../../../../assets/png/dark/new-pet-profile-icon.png")
          }
        />
      ) : (
        <Image style={styles.profileImage} source={base64ImageToUri(null)} />
      )}
      <View style={{...styles.contentWrapper, marginTop: 30}}>
        <View style={styles.actionContainer}>
          <ImageButton
            style={styles.actionButton}
            imageStyle={{...styles.actionButtonImage, width: "42%"}}
            source={
              theme === ThemeTypes.Light
                ? require("../../../../assets/png/light/camera-icon-action.png")
                : require("../../../../assets/png/dark/camera-icon-action.png")
            }
            onPress={() => undefined}
          />
          <ImageButton
            style={styles.actionButton}
            imageStyle={styles.actionButtonImage}
            source={
              theme === ThemeTypes.Light
                ? require("../../../../assets/png/light/edit-icon-action.png")
                : require("../../../../assets/png/dark/edit-icon-action.png")
            }
            onPress={() => handleToggleMode(dispatch)}
          />
          <ImageButton
            style={styles.actionButton}
            imageStyle={styles.actionButtonImage}
            source={
              theme === ThemeTypes.Light
                ? require("../../../../assets/png/light/share-icon-action.png")
                : require("../../../../assets/png/dark/share-icon-action.png")
            }
            onPress={() => handleShare(dispatch, data.id)}
          />
          <ImageButton
            style={{
              ...styles.actionButton,
              ...styles.deleteButton,
              marginRight: 0,
            }}
            imageStyle={styles.actionButtonImage}
            source={
              theme === ThemeTypes.Light
                ? require("../../../../assets/png/delete-icon-action.png")
                : require("../../../../assets/png/delete-icon-action.png")
            }
            onPress={() => undefined}
          />
        </View>
        <Text style={{...styles.headline}}>
          {language.petDetails.generalInformationTitle}
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
        <Text style={styles.headline}>{language.petDetails.medicalTitle}</Text>
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
        <Text style={styles.headline}>{language.petDetails.notesTitle}</Text>
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
