import * as React from "react";

import {TextInput, View} from "react-native";

import {createStyle, ThemeTypes, getColors} from "../../../theme";
import {InputValues} from "../../../store/actions/new-pet";

import {applyStyles} from "./index.style";

interface IProps {
  id: string;
  style: any;
  theme: ThemeTypes;
  value: InputValues;
  placeholder?: string;
  onChange: (id: string, value: InputValues) => void;
}

export const InputField = (props: IProps) => {
  const {id, placeholder, style, theme, value, onChange} = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        clearButtonMode={"while-editing"}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={text => onChange(id, text)}
        placeholderTextColor={colors.color12}
        returnKeyType="done"
        value={value as any}
      />
    </View>
  );
}


