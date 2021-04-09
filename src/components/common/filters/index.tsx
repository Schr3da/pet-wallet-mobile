import * as React from "react";

import {View, ViewStyle} from "react-native";

import {ThemeTypes, createStyle, getColors} from "../../../theme";
import {RoundedButton} from "../rounded-button";
import {IFilterDataDto} from "../../../dto/filters";

import {applyStyles} from "./index.style";
import {useDispatch} from "react-redux";
import {handleChangeFilter} from "../../../store/actions/filters";

interface IProps {
  items: IFilterDataDto[];
  theme: ThemeTypes;
  style?: ViewStyle;
}

export const Filters = (props: IProps) => {
  const dispatch = useDispatch();

  const {items, theme, style} = props;

  const styles = createStyle(theme, applyStyles);

  const colors = getColors(theme);

  return (
    <View style={{...styles.container, ...style}}>
      {(items || []).map((item, index) => {
        const isSelected = item.isSelected;
        const background = isSelected ? colors.color3 : colors.color6;
        const textColor = isSelected ? colors.color6 : colors.color3;

        return (
          <RoundedButton
            key={`filter-${index}`}
            style={styles.filter}
            background={background}
            color={textColor}
            title={item.label}
            onPress={() => dispatch(handleChangeFilter(item.id))}
          />
        );
      })}
    </View>
  );
};
