import * as React from "react";

import {Image, ImageSourcePropType, Text, View} from "react-native";

import {createStyle, ThemeTypes} from "theme";

import {applyStyles} from "./index.style";

export interface IProps {
  title: string;
  theme: ThemeTypes;
  source: ImageSourcePropType;
  description?: string;
}

export const Header = (
  props: IProps
) => {
  const {description, source, title, theme} = props;
  
  const styles = createStyle(theme, applyStyles);
  
  return (
    <View style={styles.container as any}>
      <Image style={styles.image} source={source} />
      <Text style={styles.title as any}>{title}</Text>
      <Text style={styles.text as any}>{description || ""}</Text>
    </View>
  );
}
