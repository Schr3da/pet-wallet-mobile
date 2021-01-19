import * as React from "react";

import {Image, ImageSourcePropType, Text, View} from "react-native";

import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

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
        {description == null || description === "" ? null :
        <Text style={styles.text}>
          {description} 
        </Text>}
      </View>
    </View>
  );
}
