import * as React from "react";

import {Text, TouchableOpacity, View} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputValues} from "../../../store/actions/new-pet";
import {InputTypes, onFocus} from "../../../store/actions/layout";

import {applyStyles} from "./index.style";
import {useDispatch} from "react-redux";

const handleFocus = (
  dispatch: any, id: string | null,
) => {
  dispatch(onFocus(id, InputTypes.date));
};

interface IProps {
  id: string;
  style: any;
  theme: ThemeTypes;
  value: InputValues;
  placeholder?: string;
}

export const DateField = (props: IProps) => {
  const dispatch = useDispatch();

  const {id, placeholder, style, theme, value} = props;

  const hasValue = value != null;

  const styles = createStyle(theme, applyStyles(hasValue));

  return (
    <View style={{...styles.container, ...style}}>
        <TouchableOpacity onPress={() => handleFocus(dispatch, id)} activeOpacity={1}>
            <Text style={styles.input} numberOfLines={1}>{value || placeholder}</Text>
        </TouchableOpacity>
    </View>
  );
};
