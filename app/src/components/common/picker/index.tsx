import * as React from "react";

import {Picker} from "@react-native-picker/picker";
import {View} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, getColors, ThemeTypes} from "../../../theme";
import {getTranslation, LanguageTypes} from "../../../language";
import {PrimaryButton, SecondaryButton} from "../rounded-button";
import {onSetPickerVisibility, onFocus} from "../../../store/actions/layout";
import {InputTypes} from "../../../enums/layout";

import {applyStyles} from "./index.style";

export interface IPickerData {
  id?: string;
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
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(null);
  const [itemId, setId] = React.useState<string | null>(null);

  const [didInteract, setDidInteract] = React.useState(false);

  const {isApplePlatform, id, theme, locale, onComplete} = props;

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

  const data = [...pleaseSelect, ...(props.data || [])];

  return (
    <View style={styles.container}>
      <Picker
        style={styles.picker}
        itemStyle={styles.itemStyle}
        selectedValue={value}
        dropdownIconColor={textColor}
        onValueChange={(item, index) => {
          const hasInterected = index !== 0;
          setDidInteract(hasInterected);
          setValue(item);

          const d = data[index] as IPickerData;
          setId(d == null ? null : d.id || null);
        }}>
        {data.map((d, i) => (
          <Picker.Item
            key={i}
            color={textColor}
            label={d.label}
            value={d.value}
          />
        ))}
      </Picker>
      <View style={styles.buttonWrapper}>
        <SecondaryButton
          theme={theme}
          title={language.common.cancel}
          style={styles.button}
          onPress={() => {
            dispatch(onFocus(null, null));
            dispatch(onSetPickerVisibility(false, InputTypes.text));
          }}
        />
        {didInteract && (
          <PrimaryButton
            theme={theme}
            title={language.common.pick}
            style={styles.button}
            onPress={() => onComplete(id || itemId, value)}
          />
        )}
      </View>
    </View>
  );
};
