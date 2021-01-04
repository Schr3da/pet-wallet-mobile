import * as React from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, SubViewComponents, ViewComponents} from "../../../store/actions/navigation";

import {createStyle, getColors} from "../../../theme";

import {LanguageTypes} from "../../../language";

import type {ILayoutChildProps} from "../../common/layout";

import {StyledButton} from "../../common";

import {applyStyles} from "./index.style";

const handleHelp = (
  dispatch: React.Dispatch<any>,
  language: LanguageTypes
) => dispatch(onChangeViewComponent(
  ViewComponents.help,
  SubViewComponents.welcomeNoPets,
  language
)); 

export const HelpBar = (
  props: ILayoutChildProps
): JSX.Element =>  { 
  const dispatch = useDispatch();

  const {language, languageType, theme} = props;
  const colors = getColors(theme);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container}>
      <StyledButton 
        style={styles.button} 
        color={colors.color3} 
        onPress={() => handleHelp(dispatch, languageType)}
      >
        <Text style={styles.buttonText}>
          {language.welcome.welcomeNoPets.help.button}
        </Text> 
      </StyledButton>
    </View>
  );
};
