import * as React from "react";

import {Image, View} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import type {ICombinedReducerState} from "../../store/reducers";

import {Splash} from "../../store/actions";

import {createStyle, ThemeTypes} from "../../theme";

import {applyStyles} from "./index.style";

interface IProps {
  isAnimating: boolean;
  theme: ThemeTypes;
  hasPets: boolean;
}
  
const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  isAnimating: state.splash.isAnimating,
  theme: state.layout.theme,
  hasPets: state.pets.data.length !== 0,
});

const startAnimation = (
  dispatch: any,
  hasPets: boolean
) => {
  dispatch(Splash.onSplashAnimationStart());
  setTimeout(() => completeAnimation(dispatch, hasPets), 2000);
}

const completeAnimation = (
  dispatch: any,
  hasPets: boolean,
) =>
  dispatch(Splash.onSplashAnimationComplete(hasPets));

const didMount = (
  dispatch: any,
  hasPets: boolean
) => startAnimation(dispatch, hasPets);

export const Component = (): JSX.Element =>  {
  const dispatch = useDispatch()
  
  const {hasPets, theme}= useSelector(stateToProps); 
  
  React.useEffect(() => didMount(dispatch, hasPets), []);

  const styles = createStyle(theme, applyStyles); 
  
  return (
    <View style={styles.container as any}>
      <Image 
        source={require("../../../assets/png/app-icon.png")}
        style={styles.appIcon}  
      />
    </View>
  );
};
