import * as React from "react";

import {View, Text, ViewStyle} from "react-native";

import {createStyle, ThemeTypes} from "../../../../theme";

import {applyStyles} from "./index.style";

export enum LabelTypes {
  Large,
  Small,
}

interface ILabelProps {
  title: string;
  type: LabelTypes;
  theme: ThemeTypes;
  style: ViewStyle;
}

export const Label = (props: ILabelProps) => {
  const {style, theme, title, type} = props;

  const styles = createStyle(theme, applyStyles);
  const textStyles =
    type === LabelTypes.Small ? styles.smallText : styles.largeText;

  return (
    <View style={{...styles.container, ...(style || {})}}>
      <View style={styles.background} />
      <Text style={textStyles}>{title}</Text>
    </View>
  );
};
