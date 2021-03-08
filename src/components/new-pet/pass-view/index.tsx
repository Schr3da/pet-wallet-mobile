import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {
  ImagePicker,
  RoundedButtons,
  AttachmentPlaceholder,
  Dialog,
  InputField,
} from "../../common";
import {ICombinedReducerState} from "../../../store/reducers";

import {
  onScan,
  IImageData,
  onRemoveScan,
  InputValues,
  onPreviewScan,
  onSaveNewPet,
} from "../../../store/actions/new-pet";

import {
  handleCancelNewPet,
  handleError,
  handleInputChange,
  requestCancel,
} from "../hooks";

import {applyStyles} from "./index.style";
import {
  DialogContentTypes,
  onSetDialogContentType,
  onDismissDialog,
  ErrorTypes,
} from "../../../store/actions/layout";

interface IStateProps {
  attachments: IImageData[];
  inputs: {[key: string]: InputValues};
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  attachments: state.newPet.scans,
  inputs: state.newPet.inputs,
});

const handleScanImage = (dispatch: any, data: IImageData) =>
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

const handlePreview = (dispatch: any, id: string) =>
  dispatch(onPreviewScan(id));

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
        source={
          theme === ThemeTypes.Light
            ? require("../../../../assets/png/light/new-pet-pass-icon.png")
            : require("../../../../assets/png/dark/new-pet-pass-icon.png")
        }
      />
      <ImagePicker
        style={styles.picker}
        theme={theme}
        maxWidth={280}
        maxHeight={280}
        onError={(errorType: ErrorTypes) => handleError(dispatch, errorType)}
        onData={(data: IImageData) => handleScanImage(dispatch, data)}
      />
      <View style={styles.attachmentsWrapper}>
        {(attachments || []).length === 0 ? (
          <InputField
            id="empty"
            style={{opacity: 0.4}}
            theme={theme}
            value={language.common.noAttachments}
            disabled={true}
            onChange={() => undefined}
          />
        ) : (
          attachments.map((a: IImageData, index: number) => {
            let title = inputs[a.id];

            if (title === null) {
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
                onChange={(id: string, text: string) => handleInputChange(id, text, dispatch)}
                onRemove={(id: string) => requestRemoveAttachment(dispatch, id)}
                onPreview={(id: string) => handlePreview(dispatch, id)}
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
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPetScan.primaryButton}
        style={{marginTop: 10}}
        onPress={() => dispatch(onSaveNewPet())}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPetScan.secondaryButton}
        style={{marginTop: 4}}
        onPress={() => requestCancel(dispatch)}
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
          onPress={() => handleCancelNewPet(dispatch, languageType, hasPets)}
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
