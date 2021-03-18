import * as React from "react";

import {View, TouchableOpacity} from "react-native";

import {applyStyles} from "./index.style";
import {createStyle, ThemeTypes} from "../../../theme";

export interface IProps {
  id: string;
  theme: ThemeTypes;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const CheckBox = (props: IProps) => {
  const {id, isSelected, theme, onSelect} = props;

  const styles = createStyle(theme, applyStyles(isSelected));

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onSelect(id)} activeOpacity={0.8}>
        <View style={styles.innerContainer} />
      </TouchableOpacity>
    </View>
  );
};
