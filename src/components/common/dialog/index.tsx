import * as React from "react";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import {onDismissDialog} from "../../../store/actions/layout";
import {ThemeTypes, getColors, createStyle} from "../../../theme";
import {ILanguage} from "../../../language";
import {StyledButton} from "../styled-button";

import {applyStyle} from "./index.style";

interface IProps {
  language: ILanguage;
  theme: ThemeTypes;
  title: string;
  text: string;
  onPress: () => void;
}

const handleCancel = (dispatch: any) =>
  dispatch(onDismissDialog());

export const Dialog = (props: IProps) => {

  const dispatch = useDispatch();

  const {language, theme, title, text, onPress} = props;

  const styles = createStyle(theme, applyStyle);
  const colors = getColors(theme);

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.actionWrapper}>
          <StyledButton
            style={styles.buttonWrapper}
            color={colors.color4}
            onPress={() => handleCancel(dispatch)}
          >
            <Text style={styles.cancelButton}>{language.common.cancel}</Text>
          </StyledButton>
          <StyledButton
            style={{...styles.buttonWrapper, ...{backgroundColor: colors.color6}}}
            color={colors.color9}
            onPress={onPress}
          >
            <Text style={styles.confirmButton}>{language.common.continue}</Text>
          </StyledButton>
        </View>
      </View>
    </View>
  );
}
