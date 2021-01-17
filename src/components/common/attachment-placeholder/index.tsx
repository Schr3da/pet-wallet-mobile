import * as React from "react";

import {View, Text, ViewStyle} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";
import {ImageButton} from "../image-button";

interface IProps {
  theme: ThemeTypes;
  title: string;
  style: ViewStyle;
  onRemove: () => void;
  onPreview: () => void;
}

export const AttachmentPlaceholder = (
  props: IProps
) => {
  const {theme, title, style, onRemove, onPreview} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      <Text style={styles.text}>
        {title}
      </Text>
      <ImageButton
        style={styles.button}
        source={theme === ThemeTypes.Dark ? 
          require("../../../../assets/png/preview-icon.png") :
          require("../../../../assets/png/preview-icon.png")
        }
        onPress={onRemove}
      />
      <ImageButton
        style={{...styles.button, ...{marginLeft: 10}}}
        source={theme === ThemeTypes.Dark ?
          require("../../../../assets/png/remove-icon.png") :
          require("../../../../assets/png/remove-icon.png")
        }
        onPress={onPreview}
      />
    </View>
  );
}
