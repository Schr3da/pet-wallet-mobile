import * as React from "react";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {ImageButton} from "../../components/common/image-button";
import {getTranslation, LanguageTypes} from "../../language";
import {
  onChangeCurrentTheme,
  onChangeLanguage,
  onSetDialogContentType,
  DialogContentTypes,
} from "../../store/actions/layout";
import {
  onChangeViewComponent,
  ViewComponents,
  SubViewComponents,
} from "../../store/actions/navigation";

import {onRequestDataDeletion} from "../../store/actions/database";
import {createStyle, ThemeTypes, getColors} from "../../theme";
import {Layout, ContentButton, Dialog} from "../common";

import {applyStyles} from "./index.style";

const handleChangeLanguage = (dispatch: any, language: LanguageTypes) =>
  dispatch(onChangeLanguage(language));

const handleChangeTheme = (dispatch: any, theme: ThemeTypes) =>
  dispatch(onChangeCurrentTheme(theme));

const handleShowTermsAndConditions = (dispatch: any, language: LanguageTypes) =>
  dispatch(
    onChangeViewComponent(
      ViewComponents.termsAndConditions,
      SubViewComponents.none,
      language,
    ),
  );

const handleRequestDataDeletion = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.deleteData));

const confirmDataDeletion = (dispatch: any) =>
  dispatch(onRequestDataDeletion());

export const Component = () => {
  let dispatch = useDispatch();

  return (
    <Layout
      imageSource={require("../../../assets/png/settings-header-icon.png")}
      childRenderer={(props) => {
        const {theme, languageType} = props;

        const styles = createStyle(theme, applyStyles);
        const translation = getTranslation(languageType);

        return (
          <View style={styles.container}>
            <View style={styles.separator} />
            <Text style={styles.text}>
              {translation.settings.none.language}
            </Text>
            <View style={styles.buttonContainer}>
              <ImageButton
                style={{
                  ...styles.languageButton,
                  ...(languageType === LanguageTypes.en
                    ? styles.languageButtonActive
                    : {}),
                }}
                source={require("../../../assets/png/en-language-icon.png")}
                onPress={() => handleChangeLanguage(dispatch, LanguageTypes.en)}
              />
              <View style={styles.separator} />
              <ImageButton
                style={{
                  ...styles.languageButton,
                  ...(languageType === LanguageTypes.de
                    ? styles.languageButtonActive
                    : {}),
                }}
                source={require("../../../assets/png/de-language-icon.png")}
                onPress={() => handleChangeLanguage(dispatch, LanguageTypes.de)}
              />
            </View>
            <View style={styles.separator} />
            <Text style={styles.text}>{translation.settings.none.theme}</Text>
            <View style={styles.buttonContainer}>
              <ImageButton
                style={{
                  ...styles.languageButton,
                  ...(theme === ThemeTypes.Light
                    ? styles.languageButtonActive
                    : {}),
                }}
                source={require("../../../assets/png/light-theme-icon.png")}
                onPress={() => handleChangeTheme(dispatch, ThemeTypes.Light)}
              />
              <View style={styles.separator} />
              <ImageButton
                style={{
                  ...styles.languageButton,
                  ...(theme === ThemeTypes.Dark
                    ? styles.languageButtonActive
                    : {}),
                }}
                source={require("../../../assets/png/dark-theme-icon.png")}
                onPress={() => handleChangeTheme(dispatch, ThemeTypes.Dark)}
              />
            </View>
          </View>
        );
      }}
      footerRenderer={(props) => {
        const {theme, languageType} = props;
        const styles = createStyle(theme, applyStyles);
        const colors = getColors(theme);

        return (
          <View style={styles.notificationWrapper}>
            <ContentButton
              description={props.language.settings.none.agbs.description}
              buttonText={props.language.settings.none.agbs.button}
              theme={props.theme}
              color={colors.color5}
              onPress={() =>
                handleShowTermsAndConditions(dispatch, languageType)
              }
            />
            <ContentButton
              description={
                props.language.settings.none.accountDeletion.description
              }
              buttonText={props.language.settings.none.accountDeletion.button}
              theme={props.theme}
              color={colors.color4}
              style={{marginTop: 14}}
              onPress={() => handleRequestDataDeletion(dispatch)}
            />
          </View>
        );
      }}
      dialogRenderer={(props) => {
        const {language, theme, dialogContentType} = props;
        return dialogContentType == null ? null : (
          <Dialog
            language={language}
            theme={theme}
            title={language.dialogs[dialogContentType].title}
            text={language.dialogs[dialogContentType].text}
            onPress={() => confirmDataDeletion(dispatch)}
          />
        );
      }}
    />
  );
};
