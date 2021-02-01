import * as React from "react";

import {useDispatch, useSelector} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";

import {Dialog, RoundedButtons} from "../../common";

import {
  InputIds,
  InputValues,
  IImageData,
} from "../../../store/actions/new-pet";

import {ICombinedReducerState} from "../../../store/reducers";
import {
  DialogContentTypes,
  onDismissDialog,
} from "../../../store/actions/layout";
import {requestCancel} from "../hooks";
import {onGoBackNavigation} from "../../../store/actions/navigation";
import {LanguageTypes} from "../../../language";

const handleCancel = (dispatch: any, language: LanguageTypes) => {
  dispatch(onDismissDialog());
  dispatch(onGoBackNavigation(language));
};

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
  profile: IImageData | null;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
  inputs: state.newPet.inputs,
  profile: state.newPet.profile,
});

export const ChildView = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);

  const {theme} = props;

  return <React.Fragment></React.Fragment>;
};

export const Footer = (props: ILayoutChildProps) => {
  const dispatch = useDispatch();

  const {language, theme} = props;

  return (
    <React.Fragment>
      <RoundedButtons.PrimaryButton
        theme={theme}
        title={language.newPet.newAttachment.primaryButton}
        style={{marginTop: 10}}
        onPress={() => console.log("continue pressed")}
      />
      <RoundedButtons.SecondaryButton
        theme={theme}
        title={language.newPet.newAttachment.secondaryButton}
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
