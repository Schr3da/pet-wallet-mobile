import * as React from "react";

import {Image, View, Text} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";
import {DataList} from "../list";
import {PrimaryButton, SecondaryButton} from "../rounded-button";
import {Dialog} from "../dialog";
import {ICombinedReducerState} from "../../../store/reducers";
import {LanguageTypes} from "../../../language";
import {base64ImageToUri, inputValueEmpty} from "../../common/utils";
import {createStyle} from "../../../theme";
import {DialogContentTypes, InputTypes} from "../../../enums/layout";
import {IListData} from "../../common/list";
import {IScanDataDto} from "../../../dto/scan";
import {IImageDataDto} from "../../../dto/image";
import {ImageButton} from "../image-button";

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
  InputValues,
  onInputFieldChange,
  onRemoveNewScanEntity,
} from "../../../store/actions/scan-result";

import {applyStyles} from "./index.style";

const requestCancel = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.cancelNewPet));

const handleCancel = (dispatch: any) => {
  dispatch(onDismissDialog());
  dispatch(onCancelScanResult());
};

interface IStateProps {
  image: IImageDataDto | null;
  data: IScanDataDto | null;
  hasFocus: boolean;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  image: state.scan.image,
  data: state.scan.result,
  hasFocus: state.layout.focus != null,
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
  const {hasFocus} = stateProps;

  const {theme, language, languageType} = props;

  const data = mapEntityToData(stateProps.data, languageType);
  const hasAutocomplete = hasSuggestions(stateProps.data, languageType);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        {stateProps.image == null ? null : (
          <Image
            style={styles.image}
            source={base64ImageToUri(stateProps.image)}
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
          actionRenderer={(item) => {
            const isEmptyValue = inputValueEmpty(item.value);

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
            dispatch(onInputFieldChange(id, value))
          }
        />
      </View>
    </View>
  );
};

export interface IFooterProps extends ILayoutChildProps {
  onSave: () => void;
}

export const Footer = (props: IFooterProps) => {
  const dispatch = useDispatch();

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
        onPress={onSave}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme, dialogContentType} = props;
  const {title, text} = language.dialogs.cancelAttachmentChanges;

  switch (dialogContentType) {
    case DialogContentTypes.cancelNewPet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => handleCancel(dispatch)}
        />
      );
    default:
      return null;
  }
};
