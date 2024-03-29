import * as React from "react";
import {Image, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {DataList} from "../list";
import {PrimaryButton, SecondaryButton} from "../rounded-button";
import {Dialog} from "../dialog";
import {ICombinedReducerState} from "../../../store/reducers";
import {LanguageTypes} from "../../../language";
import {createStyle} from "../../../theme";
import {DialogContentTypes, InputTypes} from "../../../enums/layout";
import {IListData} from "../../common/list";
import {IScanDataDto} from "../../../dto/scan";
import {IImageDataDto} from "../../../dto/image";
import {ImageButton} from "../image-button";
import {onInputChange} from "../../../store/actions/inputs";
import {InputValues} from "../../../enums/input";

import {
  onDismissDialog,
  onSetDialogContentType,
  onSetPickerVisibility,
  onFocus,
} from "../../../store/actions/layout";

import {
  onCreateNewScanEntity,
  onToggleSelectionScanEntity,
  onCancelScanResult,
  onRemoveNewScanEntity,
} from "../../../store/actions/scan-result";

import {
  base64ImageToUri,
  inputValueEmpty,
  getInputData,
} from "../../common/utils";

import {applyStyles} from "./index.style";

const requestCancel = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.cancelAttachmentChanges));

const handleCancel = (dispatch: any) => {
  dispatch(onDismissDialog());
  dispatch(onCancelScanResult());
};

const requestSave = (dispatch: any) => {
  dispatch(onSetDialogContentType(DialogContentTypes.noDataSelected));
};

interface IStateProps {
  image: IImageDataDto | null;
  data: IScanDataDto | null;
  hasFocus: boolean;
  inputs: {[key: string]: InputValues};
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  image: state.scan.image,
  data: state.scan.result,
  hasFocus: state.layout.focus != null,
  inputs: getInputData(state),
});

const mapEntityToData = (
  data: IScanDataDto | null,
  languageType: LanguageTypes,
): IListData[] => {
  if (data == null || data.prefills == null) {
    return [];
  }

  return (data.prefills[languageType] || []).map((p) => ({
    id: p.id,
    value: p.shortInfo,
    type: InputTypes.text,
    isSelected: p.isSelected,
  }));
};

const hasSuggestions = (
  data: IScanDataDto | null,
  languageType: LanguageTypes,
) => {
  if (data == null || data.suggestions == null) {
    return false;
  }

  return (data.suggestions[languageType] || []).length > 0;
};

export const ChildView = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {hasFocus, inputs, image} = stateProps;

  const {theme, language, languageType} = props;

  const data = mapEntityToData(stateProps.data, languageType);
  const hasAutocomplete = hasSuggestions(stateProps.data, languageType);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {image && (
          <Image
            style={styles.image}
            source={
              typeof image === "string" ? {uri: image} : base64ImageToUri(image)
            }
          />
        )}
      </View>
      <Text style={styles.info}>
        {(data || []).length === 0
          ? language.scanResult.scanResultEmpty
          : language.scanResult.scanResultInfo}
      </Text>
      <View style={styles.resultWrapper}>
        <DataList
          style={styles.list}
          theme={theme}
          language={languageType}
          data={data}
          inputs={inputs}
          actionRenderer={(item) => {
            const isEmptyValue = inputValueEmpty(inputs[item.id]);

            if (hasFocus) {
              return null;
            }

            return (
              <React.Fragment>
                {hasAutocomplete === false ? null : (
                  <ImageButton
                    style={styles.autocompleteButon}
                    source={require("../../../../assets/png/carret-icon.png")}
                    onPress={() => {
                      dispatch(onFocus(item.id, InputTypes.text));
                      dispatch(onSetPickerVisibility(true, InputTypes.picker));
                    }}
                  />
                )}
                {isEmptyValue === false ? null : (
                  <ImageButton
                    style={styles.removeButton}
                    source={require("../../../../assets/png/remove-icon.png")}
                    onPress={() => dispatch(onRemoveNewScanEntity(item.id))}
                  />
                )}
              </React.Fragment>
            );
          }}
          onAdd={() => dispatch(onCreateNewScanEntity())}
          onSelect={(id: string) => dispatch(onToggleSelectionScanEntity(id))}
          onChange={(id: string, value: InputValues) =>
            dispatch(onInputChange(id, value))
          }
        />
      </View>
    </View>
  );
};

const footerPropsToState = (state: ICombinedReducerState) => {
  const {language} = state.layout;
  const {result} = state.scan;

  return {
    hasSelectedItems:
      result == null
        ? false
        : result.prefills[language].some((r) => r.isSelected === true),
  };
};

export interface IFooterProps extends ILayoutChildProps {
  onSave: () => void;
}

export const Footer = (props: IFooterProps) => {
  const dispatch = useDispatch();

  const {hasSelectedItems} = useSelector(footerPropsToState);

  const {language, theme, onSave} = props;

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
        onPress={() => (hasSelectedItems ? onSave() : requestSave(dispatch))}
      />
    </React.Fragment>
  );
};

export interface IDialogProps extends ILayoutChildProps {
  onSave: () => void;
}

export const Dialogs = (props: IDialogProps) => {
  const dispatch = useDispatch();

  const {language, theme, dialogContentType, onSave} = props;

  switch (dialogContentType) {
    case DialogContentTypes.cancelAttachmentChanges:
      return (
        <Dialog
          title={language.dialogs.cancelAttachmentChanges.title}
          text={language.dialogs.cancelAttachmentChanges.text}
          theme={theme}
          language={language}
          onPress={() => handleCancel(dispatch)}
        />
      );
    case DialogContentTypes.noDataSelected:
      return (
        <Dialog
          title={language.dialogs.noDataSelected.title}
          text={language.dialogs.noDataSelected.text}
          theme={theme}
          language={language}
          onPress={onSave}
        />
      );
    default:
      return null;
  }
};
