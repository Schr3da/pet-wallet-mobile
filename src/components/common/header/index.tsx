import {LanguageTypes} from "language";
import * as React from "react";

import {Image, ImageSourcePropType, Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {onGoBackNavigation, ViewComponents} from "../../../store/actions/navigation";

import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

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

const handleBack = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(onGoBackNavigation(language));

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
        {hasBackButton(path) === false ? null : 
          <ImageButton
            style={styles.backButton}
            source={require("../../../../assets/png/back-icon.png")}
            onPress={() => handleBack(dispatch, languageType)}
          />
        } 
      </View>
      <View style={styles.meta as any}>
        <Image style={styles.image} source={source} />
        <Text style={styles.title as any}>{title}</Text>
        <Text style={styles.text as any}>{description || ""}</Text>
      </View>
    </View>
  );
}
