import * as React from "react";

import {Text, TouchableOpacity, View, ViewStyle} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputValues} from "../../../store/actions/new-pet";
import {InputTypes, onFocus} from "../../../store/actions/layout";

import {applyStyles} from "./index.style";
import {useDispatch} from "react-redux";
import {LanguageTypes} from "../../../language";

const handleFocus = (
  dispatch: any,
  id: string | null,
  inputType: InputTypes,
) => {
  dispatch(onFocus(id, inputType));
};

const isDateGuard = (value: any): value is Date =>
  value instanceof Date;

const valueFormatter = (
  value: InputValues,
  language?: LanguageTypes
): string | number | null => {
  if (value == null) {
    return null;
  }

  if (isDateGuard(value)) {
    return value.toLocaleDateString(language);
  }

  return value;
}

interface IProps {
  id: string;
  style: ViewStyle;
  theme: ThemeTypes;
  value: InputValues;
  inputType: InputTypes;
  placeholder?: string;
  language?: LanguageTypes;
}

export const InputTypeField = (props: IProps) => {
  const dispatch = useDispatch();

  const {language, id, inputType, placeholder, style, theme, value} = props;

  const hasValue = value != null;

  const styles = createStyle(theme, applyStyles(hasValue));

  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        onPress={() => handleFocus(dispatch, id, inputType)}
        activeOpacity={1}>
        <Text style={styles.input} numberOfLines={1}>
          {valueFormatter(value, language) || placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
