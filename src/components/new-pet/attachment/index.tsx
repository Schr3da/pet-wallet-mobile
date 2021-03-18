import * as React from "react";

import {Image, View, Text} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {Dialog, RoundedButtons, InputTypeField, DataList} from "../../common";
import {IScanResult} from "../../../store/actions/new-pet";
import {ICombinedReducerState} from "../../../store/reducers";
import {onDismissDialog} from "../../../store/actions/layout";
import {requestCancel} from "../hooks";
import {onGoBackNavigation} from "../../../store/actions/navigation";
import {LanguageTypes} from "../../../language";
import {base64ImageToUri} from "../../common/utils";
import {createStyle} from "../../../theme";
import {DialogContentTypes, InputTypes} from "../../../enums/layout";

import {applyStyles} from "./index.style";

const handleCancel = (dispatch: any, language: LanguageTypes) => {
  dispatch(onDismissDialog());
  dispatch(onGoBackNavigation(language));
};

interface IStateProps {
  data: IScanResult;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  data: state.newPet.scans.find((s) => s.isSelected)!,
});

export const ChildView = (props: ILayoutChildProps) => {
  const stateProps = useSelector(stateToProps);

  const {theme, language, languageType} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={base64ImageToUri(stateProps.data.image)}
        />
      </View>
      <Text style={styles.info}>
        {language.newPet.newPreview.scanResultInfo}
      </Text>
      <View style={styles.resultWrapper}>
        <DataList
          theme={theme}
          language={languageType}
          data={[
            {
              id: "1",
              value: "Hallo - 1",
              type: InputTypes.text,
            },
            {
              id: "2",
              value: "Hallo - 2",
              type: InputTypes.date,
            },
          ]}
          onAdd={() => undefined}
          onSelect={() => undefined}
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
