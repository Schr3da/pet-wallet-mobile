import * as React from "react";

import {Text, TouchableOpacity, View} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputValues} from "../../../store/actions/new-pet";
import {InputTypes, onFocus} from "../../../store/actions/layout";

import {applyStyles} from "./index.style";
import {useDispatch} from "react-redux";

const handleFocus = (
  dispatch: any,
  id: string | null,
  inputType: InputTypes,
) => {
  dispatch(onFocus(id, inputType));
};

interface IProps {
  id: string;
  style: any;
  theme: ThemeTypes;
  value: InputValues;
  inputType: InputTypes;
  placeholder?: string;
}

export const InputTypeField = (props: IProps) => {
  const dispatch = useDispatch();

  const {id, inputType, placeholder, style, theme, value} = props;

  const hasValue = value != null;

  const styles = createStyle(theme, applyStyles(hasValue));

  return (
    <View style={{...styles.container, ...style}}>
        <TouchableOpacity onPress={() => handleFocus(dispatch, id, inputType)} activeOpacity={1}>
            <Text style={styles.input} numberOfLines={1}>{value || placeholder}</Text>
        </TouchableOpacity>
    </View>
  );
};
