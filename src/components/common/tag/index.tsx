import * as React from "react";

import {View, Text, ViewStyle, TextStyle} from "react-native";
import {createStyle, ThemeTypes} from "../../../theme";
import {inputValueEmpty} from "../utils";

import {applyStyles} from "./index.style";

interface IProps {
  text: string | undefined | null;
  theme: ThemeTypes;
  style?: ViewStyle;
  styleText?: TextStyle;
}

export const Tag = (props: IProps) => {
  const {theme, text, style, styleText} = props;

  const styles = createStyle(theme, applyStyles);

  return inputValueEmpty(text) ? null : (
    <View style={{...styles.container, ...style}}>
      <Text numberOfLines={1} style={{...styles.text, ...(styleText || {})}}>
        {text}
      </Text>
    </View>
  );
};
