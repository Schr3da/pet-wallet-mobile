import * as React from "react";

import {View} from "react-native";
import {InputValues} from "../../../store/actions/new-pet";
import {ThemeTypes, createStyle, getColors} from "../../../theme";
import {LanguageTypes, getTranslation} from "../../../language";
import {InputField} from "../input-field";
import {InputTypes} from "../../../enums/layout";
import {InputTypeField} from "../input-type-field";
import {CheckBox} from "../checkbox";

import {applyStyles} from "./index.style";
import {RoundedButton} from "../rounded-button";
import {ImageButton} from "../image-button";
import {collectionIsEmpty, inputValueEmpty} from "../utils";

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
  onSelect: (id: string) => void;
  onChange: (id: string, value: InputValues) => void;
  onAdd: () => void;
  onRemove: (id: string) => void;
}

export const DataList = (props: IProps) => {
  const {data, language, theme, onAdd, onRemove, onSelect, onChange} = props;

  const translation = getTranslation(language);

  const colors = getColors(theme);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      {data.map((d, i) => (
        <View key={`list-item-${i}`} style={styles.item}>
          <CheckBox
            id={d.id}
            theme={theme}
            isSelected={d.isSelected}
            onSelect={onSelect}
          />
          {d.type === InputTypes.text ? (
            <InputField
              id={d.id}
              style={{}}
              theme={theme}
              value={d.value}
              placeholder={translation.scanResult.newEntity}
              onChange={onChange}
            />
          ) : (
            <InputTypeField
              id={d.id}
              style={{}}
              theme={theme}
              language={language}
              inputType={d.type}
              value={d.value}
            />
          )}
          {inputValueEmpty(d.value) === false ? null : (
            <View style={styles.actionWrapper}>
              <ImageButton
                style={styles.removeButton}
                source={
                  theme === ThemeTypes.Dark
                    ? require("../../../../assets/png/remove-icon.png")
                    : require("../../../../assets/png/remove-icon.png")
                }
                onPress={() => onRemove(d.id)}
              />
            </View>
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
