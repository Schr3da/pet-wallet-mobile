import * as React from "react";

import {TextInput} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";

import {InputValues} from "../../../store/actions/new-pet";

import {applyStyles} from "./index.style";

interface IProps {
  id: string;
  theme: ThemeTypes;
  value: InputValues;
  onChange: (id: string, value: InputValues) => void;
}

export const InputField = (props: IProps) => {
  const {id, theme, value, onChange} = props;

  const style = createStyle(theme, applyStyles);

  return (
    <TextInput
      style={style.container}
      onChangeText={text => onChange(id, text)}
      value={value as any}
    />
  );
}


