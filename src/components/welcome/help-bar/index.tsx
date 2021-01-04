import * as React from "react";

import {Text, View} from "react-native";

import {useDispatch} from "react-redux";

import {onChangeViewComponent, SubViewComponents, ViewComponents} from "../../../store/actions/layout";

import {createStyle, getColors} from "../../../theme";

import {ILayoutChildProps} from "../../common/layout";

import {StyledButton} from "../../common";

import {applyStyles} from "./index.style";

const handleHelp = (
  dispatch: React.Dispatch<any>
) => dispatch(onChangeViewComponent(
  ViewComponents.help,
  SubViewComponents.welcomeNoPets
)); 

export const HelpBar = (
  props: ILayoutChildProps
): JSX.Element =>  { 
  const dispatch = useDispatch();

  const {language, theme} = props;
  const colors = getColors(theme);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.buttonWrapper as any}>
      <StyledButton 
        style={styles.button} 
        color={colors.color3} 
        onPress={() => handleHelp(dispatch)}
      >
        <Text style={styles.buttonText}>
          {language.welcome.welcomeNoPets.help.button}
        </Text> 
      </StyledButton>
    </View>
  );
};
