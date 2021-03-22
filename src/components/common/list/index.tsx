import * as React from "react";

import {View, ViewStyle} from "react-native";
import {InputValues} from "../../../store/actions/new-pet";
import {ThemeTypes, createStyle, getColors} from "../../../theme";
import {LanguageTypes, getTranslation} from "../../../language";
import {InputField} from "../input-field";
import {InputTypes} from "../../../enums/layout";
import {InputTypeField} from "../input-type-field";
import {CheckBox} from "../checkbox";

import {applyStyles} from "./index.style";
import {RoundedButton} from "../rounded-button";

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
  style: ViewStyle;
  actionRenderer: (data: IListData) => React.ReactNode;
  onSelect: (id: string) => void;
  onChange: (id: string, value: InputValues) => void;
  onAdd: () => void;
}

export const DataList = (props: IProps) => {
  const {
    actionRenderer,
    data,
    language,
    theme,
    onAdd,
    onSelect,
    onChange,
    style,
  } = props;

  const translation = getTranslation(language);

  const colors = getColors(theme);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...style}}>
      {data.map((d, i) => (
        <View key={`list-item-${i}`} style={styles.item}>
          <CheckBox
            id={d.id}
            style={styles.checkbox}
            theme={theme}
            isSelected={d.isSelected}
            onSelect={onSelect}
          />
          {d.type === InputTypes.text ? (
            <InputField
              id={d.id}
              style={styles.input}
              theme={theme}
              value={d.value}
              placeholder={translation.scanResult.newEntity}
              onChange={onChange}
            />
          ) : (
            <InputTypeField
              id={d.id}
              style={styles.input}
              theme={theme}
              language={language}
              inputType={d.type}
              value={d.value}
            />
          )}
          {actionRenderer && (
            <View style={styles.actionWrapper}>{actionRenderer(d)}</View>
          )}
        </View>
      ))}
      <View style={styles.item}>
        <RoundedButton
          title={translation.common.addText}
          background={colors.color11}
          color={colors.color12}
          style={styles.addButton}
          onPress={onAdd}
        />
      </View>
    </View>
  );
};
