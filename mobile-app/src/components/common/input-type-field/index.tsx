import * as React from "react";

import {Text, TouchableOpacity, View, ViewStyle} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {onFocus} from "../../../store/actions/layout";
import {applyStyles} from "./index.style";
import {LanguageTypes} from "../../../language";
import {InputTypes} from "../../../enums/layout";
import {InputValues} from "../../../enums/input";
import {Tag} from "../tag";

const handleFocus = (
  dispatch: any,
  id: string | null,
  inputType: InputTypes,
) => {
  dispatch(onFocus(id, inputType));
};

const isDateGuard = (value: any): value is Date => value instanceof Date;

const valueFormatter = (
  value: InputValues,
  language?: LanguageTypes,
): string | number | null => {
  if (value == null) {
    return null;
  }

  if (isDateGuard(value)) {
    var options = {year: "numeric", month: "long", day: "numeric"};
    return value.toLocaleDateString(language, options);
  }

  return value;
};

interface IProps {
  id: string;
  style: ViewStyle;
  theme: ThemeTypes;
  value: InputValues;
  inputType: InputTypes;
  placeholder?: string;
  tag?: string;
  language?: LanguageTypes;
  disabled?: boolean;
}

export const InputTypeField = (props: IProps) => {
  const dispatch = useDispatch();

  const {
    disabled,
    language,
    id,
    inputType,
    placeholder,
    tag,
    style,
    theme,
    value,
  } = props;

  const hasValue = value != null;

  const styles = createStyle(theme, applyStyles(hasValue));

  return (
    <View style={{...styles.container, ...style}}>
      <TouchableOpacity
        onPress={() => {
          if (disabled) {
            return;
          }
          handleFocus(dispatch, id, inputType);
        }}
        activeOpacity={1}
        style={styles.wrapper}>
        <Text style={styles.input} numberOfLines={1}>
          {valueFormatter(value, language) || placeholder}
        </Text>
        <Tag text={tag} theme={theme} />
      </TouchableOpacity>
    </View>
  );
};
