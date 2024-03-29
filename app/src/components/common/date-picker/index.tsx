import * as React from "react";

import DatePicker from "react-native-date-picker";

import {View} from "react-native";

import {createStyle, getColors, ThemeTypes} from "../../../theme";
import {getTranslation, LanguageTypes} from "../../../language";
import {PrimaryButton} from "../rounded-button";

import {applyStyles} from "./index.style";

export enum DatePickerModes {
  datetime = "datetime",
  date = "date",
  time = "time",
}

export interface IProps {
  id: string | null;
  mode: DatePickerModes;
  theme: ThemeTypes;
  locale: LanguageTypes;
  onComplete: (id: string | null, date: Date) => void;
}

const getMaximumDate = (): Date => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  return new Date(year + 4, month, day);
};

export const DatePickerComponent = (props: IProps) => {
  const [date, setDate] = React.useState(new Date());

  const {id, mode, theme, locale, onComplete} = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);
  const language = getTranslation(locale);

  return (
    <View style={styles.container}>
      <DatePicker
        date={date}
        mode={mode}
        textColor={colors.color10}
        locale={locale}
        onDateChange={setDate}
        maximumDate={getMaximumDate()}
        fadeToColor={colors.color1}
      />
      <PrimaryButton
        theme={theme}
        title={language.common.pick}
        style={styles.button}
        onPress={() => onComplete(id, date)}
      />
    </View>
  );
};
