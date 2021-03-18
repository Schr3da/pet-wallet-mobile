import * as React from "react";

import {Image, View, Text} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {Dialog, RoundedButtons, DataList} from "../../common";
import {
  IScanResult,
  onCreateNewScanEntity,
  onToggleSelectionScanEntity,
} from "../../../store/actions/new-pet";
import {ICombinedReducerState} from "../../../store/reducers";
import {onDismissDialog} from "../../../store/actions/layout";
import {requestCancel} from "../hooks";
import {onGoBackNavigation} from "../../../store/actions/navigation";
import {LanguageTypes} from "../../../language";
import {base64ImageToUri} from "../../common/utils";
import {createStyle} from "../../../theme";
import {DialogContentTypes, InputTypes} from "../../../enums/layout";

import {applyStyles} from "./index.style";
import {IListData} from "../../common/list";

const handleCancel = (dispatch: any, language: LanguageTypes) => {
  dispatch(onDismissDialog());
  dispatch(onGoBackNavigation(language));
};

interface IStateProps {
  entity: IScanResult;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  entity: state.newPet.scans.find((s) => s.isSelected)!,
});

const mapEntityToData = (
  entity: IScanResult,
  languageType: LanguageTypes,
): IListData[] => {
  if (entity == null || entity.data == null || entity.data.prefills == null) {
    return [];
  }

  return (entity.data.prefills[languageType] || []).map((p) => ({
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

  const data = mapEntityToData(stateProps.entity, languageType);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={base64ImageToUri(stateProps.entity.image)}
        />
      </View>
      <Text style={styles.info}>
        {(data || []).length === 0
          ? language.newPet.newPreview.scanResultEmpty
          : language.newPet.newPreview.scanResultInfo}
      </Text>
      <View style={styles.resultWrapper}>
        <DataList
          theme={theme}
          language={languageType}
          data={data}
          onAdd={() => dispatch(onCreateNewScanEntity())}
          onSelect={(id) => dispatch(onToggleSelectionScanEntity(id))}
          onChange={() => undefined}
        />
      </View>
    </View>
  );
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme} = props;

  return (
    <React.Fragment>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newPreview.primaryButton}
        style={{marginTop: 10}}
        onPress={() => console.log("continue pressed")}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newPreview.secondaryButton}
        style={{marginTop: 4}}
        onPress={() => requestCancel(dispatch)}
      />
    </React.Fragment>
  );
};

export const Dialogs = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, languageType, theme, dialogContentType} = props;
  const {title, text} = language.dialogs.cancelAttachmentChanges;

  switch (dialogContentType) {
    case DialogContentTypes.cancelNewPet:
      return (
        <Dialog
          title={title}
          text={text}
          theme={theme}
          language={language}
          onPress={() => handleCancel(dispatch, languageType)}
        />
      );
    default:
      return null;
  }
};
