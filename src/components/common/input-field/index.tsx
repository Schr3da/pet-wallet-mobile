import * as React from "react";

import {TextInput, View} from "react-native";

import {createStyle, ThemeTypes, getColors} from "../../../theme";
import {InputValues} from "../../../store/actions/new-pet";
import {onFocus} from "../../../store/actions/layout";

import {applyStyles} from "./index.style";
import {useDispatch} from "react-redux";

let timeout: any = null;

const handleFocus = (
  dispatch: any,
  id: string | null
) => {
  clearTimeout(timeout);
  dispatch(onFocus(id))
};

const handleFocusDelayed = (
  dispatch: any,
  id: string | null,
) => {
  timeout = setTimeout(() =>
    handleFocus(dispatch, id), 100);
}

interface IProps {
  id: string;
  style: any;
  theme: ThemeTypes;
  value: InputValues;
  placeholder?: string;
  onChange: (id: string, value: InputValues) => void;
}

export const InputField = (props: IProps) => {

  const dispatch = useDispatch();

  const {id, placeholder, style, theme, value, onChange} = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        clearButtonMode={"while-editing"}
        style={styles.input}
        autoCorrect={false}
        placeholder={placeholder}
        onChangeText={text => onChange(id, text)}
        onFocus={() => handleFocus(dispatch, id)}
        onEndEditing={() => handleFocusDelayed(dispatch, null)}
        placeholderTextColor={colors.color12}
        returnKeyType="done"
        value={value as any}
      />
    </View>
  );
}


