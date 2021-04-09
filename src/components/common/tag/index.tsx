import * as React from "react";

import {View, Text, ViewStyle} from "react-native";
import {createStyle, ThemeTypes} from "../../../theme";
import {inputValueEmpty} from "../utils";

import {applyStyles} from "./index.style";

interface IProps {
  text: string | undefined | null;
  theme: ThemeTypes;
  style?: ViewStyle;
}

export const Tag = (props: IProps) => {
  const {theme, text, style} = props;

  const styles = createStyle(theme, applyStyles);

  return inputValueEmpty(text) ? null : (
    <View style={{...styles.container, ...style}}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
