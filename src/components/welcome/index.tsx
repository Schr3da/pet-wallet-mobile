import * as React from "react";

import {Text, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {onChangeViewComponent, ViewComponents} from "../../store/actions/general";
import {ICombinedReducerState} from "../../store/reducers";
import {createStyle, getColors, ThemeTypes} from "../../theme";
import {Header, StyledButton} from "../common";
import {Box} from "./box";

import {applyStyles} from "./index.style";

interface IProps {
  theme: ThemeTypes,
}

const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  theme: state.theme.current,  
});

const handleHelp = (
  dispatch: React.Dispatch<any>
) => dispatch(onChangeViewComponent(ViewComponents.help)); 

export const Component = (): JSX.Element =>  {
  const dispatch = useDispatch();
  const {theme} = useSelector(stateToProps);
  
  const colors = getColors(theme);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Header
        source={require("../../../assets/png/app-icon.png")}
        title="Willkommen"
        text="Bitte registriere zunächst dein Haustier um fortzufahren"
        theme={theme}
      />
      <Box/>
      <View style={styles.buttonWrapper as any}>
        <StyledButton style={styles.button} color={colors.color3} onPress={() => handleHelp(dispatch)}>
          <Text style={styles.buttonText}>
            Brauchst du Hilfe?
          </Text> 
        </StyledButton>
      </View>
    </View>
  );
};
