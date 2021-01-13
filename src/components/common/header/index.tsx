import * as React from "react";

import {Image, ImageSourcePropType, Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, onGoBackNavigation, SubViewComponents, ViewComponents} from "../../../store/actions/navigation";

import {createStyle, ThemeTypes} from "../../../theme";

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

export const Header = (
  props: IProps
) => {
  const {
    description,
    source, 
    title,
    theme
  } = props;
  
  const styles = createStyle(theme, applyStyles);
  
  return (
    <View style={styles.container}>
      <View style={styles.meta}>
        <Image style={styles.image} source={source} />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{description || ""}</Text>
      </View>
    </View>
  );
}
