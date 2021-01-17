import React from "react";

import {Image, View, Text} from "react-native";
import {useDispatch} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation} from "../../../language";
import {ImagePicker, RoundedButtons, AttachmentPlaceholder} from "../../common";
import {handleCancelNewPet} from "../hooks";

import {applyStyles} from "./index.style";

export const PassView = (props: ILayoutChildProps) => {

  const dispatch = useDispatch();

  const {theme, languageType, hasPets} = props;
  const styles = createStyle(theme, applyStyles); 
  
  const translation = getTranslation(languageType);

  return (
    <React.Fragment>
      <Image
        style={styles.placeholderIcon}
        source={theme === ThemeTypes.Light ? 
          require("../../../../assets/png/light/new-pet-pass-icon.png") :
          require("../../../../assets/png/dark/new-pet-pass-icon.png")
        }
        />
      <ImagePicker 
        style={styles.picker}
        theme={theme}
      />
      <View style={styles.attachmentsWrapper}>
        <AttachmentPlaceholder 
          theme={theme}
          title="Attachment-1"
          style={styles.attachment}
        />
        <AttachmentPlaceholder 
          theme={theme} 
          title="Attachment-2"
          style={styles.attachment}
        />
        <AttachmentPlaceholder 
          theme={theme} 
          title="Attachment-3"
          style={styles.attachment}
        />
      </View>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={translation.newPet.newPetScan.primaryButton}
        style={{marginTop: 20}}
        onPress={() => undefined}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={translation.newPet.newPetScan.secondaryButton}
        style={{marginTop: 10}}
        onPress={() => handleCancelNewPet(dispatch, languageType, hasPets)}
        />
    </React.Fragment>
  );

}
