import * as React from "react";

import {TextInput} from "react-native";

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
    <TextInput
      style={{...styles.container, ...style}}
      placeholder={placeholder}
      onChangeText={text => onChange(id, text)}
      placeholderTextColor={colors.color12}
      value={value as any}
    />
  );
}


