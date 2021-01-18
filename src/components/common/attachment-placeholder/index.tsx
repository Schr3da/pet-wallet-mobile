import * as React from "react";

import {View, ViewStyle, TextInput} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {onFocus} from "../../../store/actions/layout";
import {InputValues} from "../../../store/actions/new-pet";
import {ImageButton} from "../image-button";

import {applyStyles} from "./index.style";

const handleFocus = (
  dispatch: any,
  id: string | null
) => dispatch(onFocus(id));

interface IProps {
  id: string;
  theme: ThemeTypes;
  title: InputValues;
  style: ViewStyle;
  onChange: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onPreview: (id: string) => void;
}

export const AttachmentPlaceholder = (
  props: IProps
) => {
  const dispatch = useDispatch();

  const {id, theme, title, style, onChange, onRemove, onPreview} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      <TextInput
        style={styles.input}
        onChangeText={(text) => onChange(id, text)}
        onFocus={() => handleFocus(dispatch, id)}
        onEndEditing={() => handleFocus(dispatch, null)}
        returnKeyType="done"
        value={title as any}
      />
      <ImageButton
        style={styles.button}
        source={theme === ThemeTypes.Dark ? 
          require("../../../../assets/png/preview-icon.png") :
          require("../../../../assets/png/preview-icon.png")
        }
        onPress={() => onPreview(id)}
      />
      <ImageButton
        style={{...styles.button, ...{marginLeft: 10}}}
        source={theme === ThemeTypes.Dark ?
          require("../../../../assets/png/remove-icon.png") :
          require("../../../../assets/png/remove-icon.png")
        }
        onPress={() => onRemove(id)}
      />
    </View>
  );
}
