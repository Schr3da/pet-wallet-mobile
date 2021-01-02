import React from "react";

import {View} from "react-native";
import {useSelector} from "react-redux";


import {ICombinedReducerState} from "../../store/reducers";
import {createStyle, ThemeTypes} from "../../theme";
import {Header} from "../common";
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

export const Component = (): JSX.Element =>  {
  const {theme} = useSelector(stateToProps);
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
    </View>
  );
};
