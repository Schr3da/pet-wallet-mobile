import * as React from "react";

import {Image, ImageSourcePropType, Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, onGoBackNavigation, SubViewComponents, ViewComponents} from "../../../store/actions/navigation";

import {createStyle} from "../../../theme";

import {ILayoutChildProps} from "../layout";

import {LanguageTypes} from "../../../language";

import {ImageButton} from "../image-button";

import {applyStyles} from "./index.style";

export interface IProps extends ILayoutChildProps{
  title: string;
  description: string;
  path: string[];
  source: ImageSourcePropType;
}

const hasBackButton = (
  path: string[] 
) => path == null || path.length === 0 ? false :
  path[0] !== ViewComponents.welcome;

const hasSettingsButton = (
  path: string[] 
) => path == null || path.length === 0 ? false :
  path[0] !== ViewComponents.settings;

const handleBackPressed = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(onGoBackNavigation(language));

const handleSettingsPressed = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(
  onChangeViewComponent(
    ViewComponents.settings,
    SubViewComponents.none,
    language,
  ));

export const Header = (
  props: IProps
) => {
  const dispatch = useDispatch();
  const {
    description,
    languageType,
    path,
    source, 
    title,
    theme
  } = props;
  
  const styles = createStyle(theme, applyStyles);
  
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View style={styles.rowLeft}>
          {hasBackButton(path) === false ? null : 
          <ImageButton
            style={styles.backButton}
            source={require("../../../../assets/png/back-icon.png")}
            onPress={() => handleBackPressed(dispatch, languageType)}
          />
        } 
        </View>
        <View style={styles.rowRight}>
          {hasSettingsButton(path) === false ? null : 
            <ImageButton
              style={styles.backButton}
              source={require("../../../../assets/png/settings-icon.png")}
              onPress={() => handleSettingsPressed(dispatch, languageType)}
            />
          }
        </View>
      </View>
      <View style={styles.meta}>
        <Image style={styles.image} source={source} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description || ""}</Text>
      </View>
    </View>
  );
}
