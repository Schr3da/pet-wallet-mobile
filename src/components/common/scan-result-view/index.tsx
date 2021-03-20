import * as React from "react";

import {Image, View, Text} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {Dialog, RoundedButtons, DataList} from "../../common";
import {ICombinedReducerState} from "../../../store/reducers";
import {
  onDismissDialog,
  onSetDialogContentType,
} from "../../../store/actions/layout";
import {LanguageTypes} from "../../../language";
import {base64ImageToUri} from "../../common/utils";
import {createStyle} from "../../../theme";
import {DialogContentTypes, InputTypes} from "../../../enums/layout";
import {IListData} from "../../common/list";
import {IScanDataDto} from "../../../dto/scan";
import {IImageDataDto} from "../../../dto/image";

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
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  image: state.scan.image,
  data: state.scan.result,
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

export const ChildView = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);

  const {theme, language, languageType} = props;

  const styles = createStyle(theme, applyStyles);

  const data = mapEntityToData(stateProps.data, languageType);

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
          theme={theme}
          language={languageType}
          data={data}
          onAdd={() => dispatch(onCreateNewScanEntity())}
          onRemove={(id: string) => dispatch(onRemoveNewScanEntity(id))}
          onSelect={(id: string) => dispatch(onToggleSelectionScanEntity(id))}
          onChange={(id: string, value: InputValues) =>
            dispatch(onInputFieldChange(id, value))
          }
        />
      </View>
    </View>
  );
};

const handleSave = (_dispatch: any) => {
  console.log("handle save");
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme} = props;

  return (
    <React.Fragment>
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.scanResult.secondaryButton}
        onPress={() => requestCancel(dispatch)}
      />
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.scanResult.primaryButton}
        onPress={() => handleSave(dispatch)}
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
