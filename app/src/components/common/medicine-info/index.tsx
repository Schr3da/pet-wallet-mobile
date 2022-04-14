import * as React from "react";

import {View, Text, ViewStyle} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {InputValues} from "../../../enums/input";
import {Tag} from "../tag";

import {applyStyles} from "./index.style";
import {ImageButton} from "../image-button";

interface IProps {
  id: string;
  style: ViewStyle;
  theme: ThemeTypes;
  value: InputValues;
  tag?: string;
  numberOfLines?: number;
  disabled?: boolean;
  onRemove?: (id: string) => void;
}

export const MedicineInfo = (props: IProps) => {
  const {
    id,
    disabled,
    style,
    theme,
    numberOfLines,
    tag,
    value,
    onRemove,
  } = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      <View style={styles.titleContainer}>
        <View style={{flex: 1, marginRight: 40}}>
          <Tag text={tag} theme={theme} style={styles.tag} />
        </View>
        {disabled == true ? null : (
          <ImageButton
            style={styles.removeButton}
            source={require("../../../../assets/png/remove-icon.png")}
            onPress={() => onRemove && onRemove(id)}
          />
        )}
      </View>
      <Text style={styles.text} numberOfLines={numberOfLines}>
        {value}
      </Text>
    </View>
  );
};
