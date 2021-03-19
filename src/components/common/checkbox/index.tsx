import * as React from "react";

import {View, TouchableOpacity, Image} from "react-native";

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
    <TouchableOpacity onPress={() => onSelect(id)} activeOpacity={0.8}>
      <View style={styles.touchContainer}>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={
              theme === ThemeTypes.Dark
                ? require("../../../../assets/png/dark/check-icon.png")
                : require("../../../../assets/png/light/check-icon.png")
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
