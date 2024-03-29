import * as React from "react";

import {View, ViewStyle, TextInput} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {onFocus} from "../../../store/actions/layout";
import {ImageButton} from "../image-button";
import {InputTypes} from "../../../enums/layout";
import {InputValues} from "../../../enums/input";

import {applyStyles} from "./index.style";

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
  theme: ThemeTypes;
  title: InputValues;
  style: ViewStyle;
  onChange: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onPreview: (id: string) => void;
}

export const AttachmentPlaceholder = (props: IProps) => {
  const dispatch = useDispatch();

  const {id, theme, title, style, onChange, onRemove, onPreview} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        style={styles.input}
        onChangeText={(text: string) => onChange(id, text)}
        onFocus={() => handleFocus(dispatch, id)}
        onEndEditing={() => handleFocusDelayed(dispatch, null)}
        returnKeyType="done"
        autoCorrect={false}
        value={(title as string) || undefined}
      />
      <ImageButton
        style={styles.button}
        source={
          theme === ThemeTypes.Dark
            ? require("../../../../assets/png/preview-icon.png")
            : require("../../../../assets/png/preview-icon.png")
        }
        onPress={() => onPreview(id)}
      />
      <ImageButton
        style={{...styles.button, ...{marginLeft: 6}}}
        source={
          theme === ThemeTypes.Dark
            ? require("../../../../assets/png/remove-icon.png")
            : require("../../../../assets/png/remove-icon.png")
        }
        onPress={() => onRemove(id)}
      />
    </View>
  );
};
