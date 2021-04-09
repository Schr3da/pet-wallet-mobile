import * as React from "react";
import {View, ViewStyle} from "react-native";
import {useDispatch} from "react-redux";

import {ImageButton} from "../../../../common/image-button";
import {ThemeTypes, createStyle} from "../../../../../theme";
import {LanguageTypes} from "../../../../../language";
import {onSharePet} from "../../../../../store/actions/pets";
import {onShowEditView} from "../../../../../store/actions/pet-details";

import {
  onSetErrorCode,
  onSetPickerVisibility,
  onSetDialogContentType,
} from "../../../../../store/actions/layout";

import {
  ErrorTypes,
  InputTypes,
  DialogContentTypes,
} from "../../../../../enums/layout";

import {applyStyles} from "./index.style";

const handleEditView = (dispatch: any, id: string) =>
  dispatch(onShowEditView(id));

const handleShare = (dispatch: any, id: string | null) =>
  id === null
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : dispatch(onSharePet(id));

const showScanPicker = (dispatch: any) =>
  dispatch(onSetPickerVisibility(true, InputTypes.picker));

const requestPetDelete = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.deletePet));

interface IProps {
  id: string;
  theme: ThemeTypes;
  language: LanguageTypes;
  style: ViewStyle;
}

export const ActionBar = (props: IProps) => {
  const dispatch = useDispatch();

  const {id, theme, style} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      <ImageButton
        style={styles.actionButton}
        imageStyle={{
          ...styles.actionButtonImage,
          width: "50%",
          height: "50%",
        }}
        source={
          theme === ThemeTypes.Light
            ? require("../../../../../../assets/png/light/scan-icon.png")
            : require("../../../../../../assets/png/dark/scan-icon.png")
        }
        onPress={() => showScanPicker(dispatch)}
      />
      <ImageButton
        style={styles.actionButton}
        imageStyle={styles.actionButtonImage}
        source={
          theme === ThemeTypes.Light
            ? require("../../../../../../assets/png/light/edit-icon-action.png")
            : require("../../../../../../assets/png/dark/edit-icon-action.png")
        }
        onPress={() => handleEditView(dispatch, id)}
      />
      <ImageButton
        style={styles.actionButton}
        imageStyle={styles.actionButtonImage}
        source={
          theme === ThemeTypes.Light
            ? require("../../../../../../assets/png/light/share-icon-action.png")
            : require("../../../../../../assets/png/dark/share-icon-action.png")
        }
        onPress={() => handleShare(dispatch, id)}
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
            ? require("../../../../../../assets/png/delete-icon-action.png")
            : require("../../../../../../assets/png/delete-icon-action.png")
        }
        onPress={() => requestPetDelete(dispatch)}
      />
    </View>
  );
};
