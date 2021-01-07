import * as React from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {LanguageTypes} from "../../language";

import {ImageButton} from "../../components/common/image-button";

import {onChangeCurrentTheme, onChangeLanguage} from "../../store/actions/layout";

import {createStyle, ThemeTypes} from "../../theme";

import {Layout} from "../common";

import {applyStyles} from "./index.style";

const handleChangeLanguage = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(onChangeLanguage(language));

const handleChangeTheme = (
  dispatch: any,
  theme: ThemeTypes,
) => dispatch(onChangeCurrentTheme(theme));

export const Component = () => {
  let dispatch = useDispatch();
  return (
    <Layout
      imageSource={require("../../../assets/png/settings-header-icon.png")}
      render={(props) => {
        const {theme, languageType} = props;
        const styles = createStyle(theme, applyStyles); 

        return (
          <View style={styles.container}>
            <View style={styles.separator}/>
            <Text style={styles.text}>Selected Language</Text>
            <View style={styles.buttonContainer}>
              <ImageButton
                style={{...styles.languageButton, ...(languageType === LanguageTypes.en ? styles.languageButtonActive : {})}}
                source={require("../../../assets/png/en-language-icon.png")}
                onPress={() => handleChangeLanguage(dispatch, LanguageTypes.en)}
              />
              <View style={styles.separator}/>
              <ImageButton
                style={{...styles.languageButton, ...(languageType === LanguageTypes.de ? styles.languageButtonActive : {})}}
                source={require("../../../assets/png/de-language-icon.png")}
                onPress={() => handleChangeLanguage(dispatch, LanguageTypes.de)}
              />
            </View>
            <View style={styles.separator}/>
            <Text style={styles.text}>Selected Theme</Text>
            <View style={styles.buttonContainer}>
              <ImageButton
                style={{...styles.languageButton, ...(theme === ThemeTypes.Light ? styles.languageButtonActive : {})}}
                source={require("../../../assets/png/light-theme-icon.png")}
                onPress={() => handleChangeTheme(dispatch, ThemeTypes.Light)}
              />
              <View style={styles.separator}/>
              <ImageButton
                style={{...styles.languageButton, ...(theme === ThemeTypes.Dark ? styles.languageButtonActive : {})}}
                source={require("../../../assets/png/dark-theme-icon.png")}
                onPress={() => handleChangeTheme(dispatch, ThemeTypes.Dark)}
              />
            </View>
          </View>
        );
      }}  
    />
  );
}
