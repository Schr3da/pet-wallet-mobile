import * as React from "react";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import * as RoundedButtons from "../rounded-button";

import {onDismissDialog} from "../../../store/actions/layout";
import {ThemeTypes, createStyle} from "../../../theme";
import {ILanguage} from "../../../language";

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

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.actionWrapper}>
          <RoundedButtons.SecondaryButton
            theme={theme}
            title={language.common.cancel}
            onPress={() => handleCancel(dispatch)}
          />
          <RoundedButtons.PrimaryButton
            theme={theme}
            title={language.common.continue}
            onPress={onPress}
          />
        </View>
      </View>
    </View>
  );
}
