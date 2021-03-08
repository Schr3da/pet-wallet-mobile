import * as React from "react";

import {Picker} from "@react-native-picker/picker";

import {View} from "react-native";

import {createStyle, getColors, ThemeTypes} from "../../../theme";
import {getTranslation, LanguageTypes} from "../../../language";
import {PrimaryButton} from "../rounded-button";

import {applyStyles} from "./index.style";

export interface IPickerData {
  label: string;
  value: string;
}

export interface IProps {
  id: string | null;
  theme: ThemeTypes;
  locale: LanguageTypes;
  data: IPickerData[];
  isApplePlatform: boolean;
  onComplete: (id: string | null, value: string | null) => void;
}

export const PickerComponent = (props: IProps) => {
  const [value, setValue] = React.useState(null);

  const {data, isApplePlatform, id, theme, locale, onComplete} = props;

  const styles = createStyle(theme, applyStyles(isApplePlatform));
  const language = getTranslation(locale);
  const colors = getColors(theme);
  const textColor = isApplePlatform ? colors.color10 : colors.color12;

  const pleaseSelect = [
    {
      label: language.common.pleaseSelect,
      value: null,
    },
  ];

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        itemStyle={styles.itemStyle}
        selectedValue={value}
        dropdownIconColor={textColor}
        onValueChange={setValue}>
        {[...pleaseSelect, ...(data || [])].map((d, i) => (
          <Picker.Item
            key={i}
            color={textColor}
            label={d.label}
            value={d.value}
          />
        ))}
      </Picker>
      <PrimaryButton
        theme={theme}
        title={language.common.pick}
        style={styles.button}
        onPress={() => onComplete(id, value)}
      />
    </View>
  );
};
