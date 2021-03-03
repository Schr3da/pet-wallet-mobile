import * as React from "react";

import {Picker} from "@react-native-picker/picker";

import {View} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
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
  onComplete: (id: string | null, value: string | null) => void;
}

export const PickerComponent = (props: IProps) => {
  const [value, setValue] = React.useState(null);

  const {data, id, theme, locale, onComplete} = props;

  const styles = createStyle(theme, applyStyles);
  const language = getTranslation(locale);

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
        onValueChange={setValue}>
        {[...pleaseSelect, ...(data || [])].map((d, i) => (
          <Picker.Item key={i} label={d.label} value={d.value} />
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
