import * as React from "react";

import {TextInput, View, Text, ViewStyle, TouchableOpacity} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes, getColors} from "../../../theme";
import {onFocus} from "../../../store/actions/layout";
import {InputTypes} from "../../../enums/layout";
import {InputValues} from "../../../enums/input";
import {Tag} from "../tag";

import {applyStyles} from "./index.style";

export type KeyboardTypes =
  | "default"
  | "email-address"
  | "numeric"
  | "phone-pad"
  | "number-pad"
  | "decimal-pad";

let timeout: any = null;

const handleFocus = (dispatch: any, id: string | null) => {
  clearTimeout(timeout);
  dispatch(onFocus(id, InputTypes.text));
};

const handleFocusDelayed = (dispatch: any, id: string | null) => {
  timeout = setTimeout(() => handleFocus(dispatch, id), 100);
};

interface IProps {
  id: string;
  style: ViewStyle;
  theme: ThemeTypes;
  value: InputValues;
  tag?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: KeyboardTypes;
  onChange: (id: string, value: InputValues) => void;
}

export const InputField = (props: IProps) => {
  const dispatch = useDispatch();

  let input = React.useRef<any>(null);

  const {
    id,
    disabled,
    placeholder,
    style,
    type,
    theme,
    tag,
    value,
    onChange,
  } = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);

  return (
    <View style={{...styles.container, ...style}}>
      {disabled === true ? (
        <Text style={styles.text}>{value}</Text>
      ) : (
        <TouchableOpacity
          activeOpacity={1}
          style={{flex: 1}}
          onPress={() => (input as any).focus()}>
          <View pointerEvents="none">
            <TextInput
              ref={(ref: any) => (input = ref)}
              clearButtonMode={"while-editing"}
              style={styles.input}
              autoCorrect={false}
              placeholder={placeholder}
              onChangeText={(text: string) => onChange(id, text)}
              onFocus={() => handleFocus(dispatch, id)}
              onEndEditing={() => handleFocusDelayed(dispatch, null)}
              placeholderTextColor={colors.color12}
              returnKeyType="done"
              keyboardType={type || "default"}
              value={value as string | undefined}
            />
          </View>
        </TouchableOpacity>
      )}
      <Tag text={tag} theme={theme} />
    </View>
  );
};
