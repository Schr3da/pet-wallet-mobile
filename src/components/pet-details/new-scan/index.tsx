import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";

import {DialogContentTypes, ErrorTypes} from "../../../enums/layout";
import {onShowScanResult} from "../../../store/actions/scan-result";
import {ICombinedReducerState} from "../../../store/reducers";
import {IScanResult} from "../../../dto/scan";

import {
  ImagePicker,
  RoundedButtons,
  AttachmentPlaceholder,
  Dialog,
  InputField,
} from "../../common";

import {
  onRemoveScan,
  InputValues,
  onCompleteNewPet,
  onCancelNewPet,
  onScan,
} from "../../../store/actions/new-pet";

import {
  onSetDialogContentType,
  onDismissDialog,
  onSetErrorCode,
} from "../../../store/actions/layout";

import {IImageDataDto} from "../../../dto/image";

import {applyStyles} from "./index.style";

export const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => undefined;

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const requestCancel = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.cancelNewPet));

interface IStateProps {
  attachments: IScanResult[];
  inputs: {[key: string]: InputValues};
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  attachments: state.newPet.scans,
  inputs: state.newPet.inputs,
});

const handleScanImage = (dispatch: any, data: IImageDataDto) =>
  dispatch(onScan(data));

let attachmentIdToRemove: string | null = null;
const requestRemoveAttachment = (dispatch: any, id: string) => {
  attachmentIdToRemove = id;
  dispatch(onSetDialogContentType(DialogContentTypes.deleteAttachment));
};

const handleRemoveAttachment = (dispatch: any, id: string) => {
  attachmentIdToRemove = null;
  dispatch(onDismissDialog());
  dispatch(onRemoveScan(id));
};

const handleShowScanResult = (dispatch: any, result: IScanResult) => {
  dispatch(onShowScanResult(result.image, result.data));
};

export const Component = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {inputs, attachments} = stateProps;

  const {theme, language} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <React.Fragment>
      <Image
        style={styles.placeholderIcon}
        source={
          theme === ThemeTypes.Light
            ? require("../../../../assets/png/light/new-pet-pass-icon.png")
            : require("../../../../assets/png/dark/new-pet-pass-icon.png")
        }
      />
      <ImagePicker
        style={styles.picker}
        theme={theme}
        maxWidth={1600}
        maxHeight={1600}
        onError={(errorType: ErrorTypes) => handleError(dispatch, errorType)}
        onData={(data: IImageDataDto) => handleScanImage(dispatch, data)}
      />
      <View style={styles.attachmentsWrapper}>
        {(attachments || []).length === 0 ? (
          <InputField
            id="empty"
            style={{opacity: 0.4}}
            theme={theme}
            value={language.common.noScansFound}
            disabled={true}
            onChange={() => undefined}
          />
        ) : (
          attachments.map((a: IScanResult, index: number) => {
            let title = inputs[a.id];

            if (title == null) {
              title =
                language.newPet.newPetScan.attachmentLabel + " " + (index + 1);
            }

            return (
              <AttachmentPlaceholder
                id={a.id}
                key={a.id}
                theme={theme}
                title={title}
                style={styles.attachment}
                onChange={(id: string, text: string) =>
                  handleInputChange(id, text, dispatch)
                }
                onRemove={(id: string) => requestRemoveAttachment(dispatch, id)}
                onPreview={() => handleShowScanResult(dispatch, a)}
              />
            );
          })
        )}
      </View>
    </React.Fragment>
  );
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {theme, language} = props;

  return (
    <React.Fragment>
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPetScan.secondaryButton}
        onPress={() => requestCancel(dispatch)}
      />
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetScan.primaryButton}
        onPress={() => dispatch(onCompleteNewPet())}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, languageType, hasPets, theme, dialogContentType} = props;

  switch (dialogContentType) {
    case DialogContentTypes.cancelNewPet:
      return (
        <Dialog
          title={language.dialogs.cancelNewPet.title}
          text={language.dialogs.cancelNewPet.text}
          theme={theme}
          language={language}
          onPress={() => dispatch(onCancelNewPet(languageType, hasPets))}
        />
      );
    case DialogContentTypes.deleteAttachment:
      return (
        <Dialog
          title={language.dialogs.deleteAttachment.title}
          text={language.dialogs.deleteAttachment.text}
          theme={theme}
          language={language}
          onPress={() =>
            handleRemoveAttachment(dispatch, attachmentIdToRemove!)
          }
        />
      );
    default:
      return null;
  }
};
