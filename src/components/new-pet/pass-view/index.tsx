import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImagePicker, RoundedButtons, AttachmentPlaceholder} from "../../common";
import {ICombinedReducerState} from "../../../store/reducers";
import {onScan, IImageData, onRemoveScan, InputValues, onPreviewScan, onSaveNewPet} from "../../../store/actions/new-pet";
import {handleCancelNewPet, handleError, handleInputChange} from "../hooks";

import {applyStyles} from "./index.style";

interface IStateProps {
  attachments: IImageData[];
  inputs: {[key: string]: InputValues}; 
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  attachments: state.newPet.scans,
  inputs: state.newPet.inputs,
});

const handleScanImage = (
  dispatch: any,
  data: IImageData
) => dispatch(onScan(data));

const handleRemove = (
  dispatch: any,
  id: string
) => dispatch(onRemoveScan(id));

const handlePreview = (
  dispatch: any,
  id: string
) => dispatch(onPreviewScan(id));

export const ChildView = (props: ILayoutChildProps) => {

  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {inputs, attachments} = stateProps;

  const {theme, language} = props;
  const styles = createStyle(theme, applyStyles); 
  
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
        maxWidth={280}
        maxHeight={280}
        onError={() => handleError(dispatch,
          language.newPet.newPetScan.scanErrorTitle,
          language.newPet.newPetScan.scanErrorMessage,
        )}
        onData={(data) => handleScanImage(dispatch, data)}
      />
      <View style={styles.attachmentsWrapper}>
        {attachments.map((a, index) => {
          let title = inputs[a.id];
          
          if (title === null) {
            title = language.newPet.newPetScan.attachmentLabel + " " + (index + 1);
          }

          return (
            <AttachmentPlaceholder 
              id={a.id}
              key={a.id}
              theme={theme}
              title={title}
              style={styles.attachment}
              onChange={(id, text) => handleInputChange(id, text, dispatch)}
              onRemove={(id) => handleRemove(dispatch, id)}
              onPreview={(id) => handlePreview(dispatch, id)}
            />
          );
        })}
      </View>
    </React.Fragment>
  );
}

export const Footer = (
  props: ILayoutChildProps
) => {
  const dispatch = useDispatch();
  
  const {theme, language, languageType, hasPets} = props;

  return (
    <React.Fragment>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetScan.primaryButton}
        style={{marginTop: 20}}
        onPress={() => dispatch(onSaveNewPet())}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPetScan.secondaryButton}
        style={{marginTop: 10}}
        onPress={() => handleCancelNewPet(dispatch, languageType, hasPets)}
      />
    </React.Fragment>
  );
}
