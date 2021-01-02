import React from "react";

import {Image, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";

import {createStyle, ThemeTypes} from "../../../theme";

import {BottomBar} from "../bottom-bar";

import {applyStyles} from './index.style';

interface IProps {
  theme: ThemeTypes
}

const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  theme: state.theme.current,  
});

export const Box = (): JSX.Element =>  {
  const {theme} = useSelector(stateToProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Image
        style={styles.image}
        source={require("../../../../assets/png/animals-illustration.png")}
      />
      <BottomBar theme={theme}/>        
    </View>
  );
};
