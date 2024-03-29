import * as React from "react";

import {View, ViewStyle} from "react-native";

import {ThemeTypes, createStyle, getColors} from "../../../theme";
import {LanguageTypes, getTranslation} from "../../../language";
import {InputField} from "../input-field";
import {InputTypes} from "../../../enums/layout";
import {InputTypeField} from "../input-type-field";
import {CheckBox} from "../checkbox";
import {RoundedButton} from "../rounded-button";
import {InputValues} from "../../../enums/input";

import {applyStyles} from "./index.style";

export interface IListData {
  id: string;
  value: string;
  isSelected: boolean;
  type: InputTypes;
}

interface IProps {
  theme: ThemeTypes;
  language: LanguageTypes;
  data: IListData[];
  inputs: {[key: string]: InputValues};
  style: ViewStyle;
  disabled?: boolean;
  actionRenderer?: (data: IListData) => React.ReactNode;
  onSelect: (id: string) => void;
  onChange: (id: string, value: InputValues) => void;
  onAdd: () => void;
}

export const DataList = (props: IProps) => {
  const {
    actionRenderer,
    data,
    inputs,
    language,
    theme,
    onAdd,
    onSelect,
    onChange,
    disabled,
    style,
  } = props;

  const translation = getTranslation(language);

  const colors = getColors(theme);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      {data.map((d, i) => (
        <View key={`list-item-${i}`} style={styles.item}>
          {disabled === true ? null : (
            <CheckBox
              id={d.id}
              style={styles.checkbox}
              theme={theme}
              isSelected={d.isSelected}
              onSelect={onSelect}
            />
          )}
          {d.type === InputTypes.text ? (
            <InputField
              id={d.id}
              style={styles.input}
              theme={theme}
              value={inputs[d.id]}
              disabled={disabled}
              placeholder={translation.scanResult.newEntity}
              onChange={onChange}
            />
          ) : (
            <InputTypeField
              id={d.id}
              style={styles.input}
              theme={theme}
              language={language}
              disabled={disabled}
              inputType={d.type}
              value={inputs[d.id]}
            />
          )}
          {actionRenderer && (
            <View style={styles.actionWrapper}>{actionRenderer(d)}</View>
          )}
        </View>
      ))}
      {disabled == true ? null : (
        <View style={styles.item}>
          <RoundedButton
            title={translation.common.newEntry}
            background={colors.color6}
            color={colors.color3}
            style={styles.addButton}
            onPress={onAdd}
          />
        </View>
      )}
    </View>
  );
};
