import * as React from "react";

import {View, Image, Text} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputField} from "../../common";

import {base64ImageToUri} from "../../common/utils";
import {InputIds} from "../../../store/actions/pet-details";
import {ILayoutChildProps} from "../../common/layout";
import {IPetDto} from "../../../dto/pets";

import {applyStyles} from "../index.style";

interface IProps extends ILayoutChildProps {
  data: IPetDto;
}

export const ReadOnlyView = (props: IProps) => {
  const {data, theme, language} = props;

  const styles = createStyle(theme, applyStyles);

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
      <View style={{...styles.contentWrapper, marginTop: 40}}>
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
