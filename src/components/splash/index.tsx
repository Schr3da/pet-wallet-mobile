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
}
  
const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  isAnimating: state.splash.isAnimating,
  theme: state.layout.theme,
});

const startAnimation = (dispatch: any) => {
  dispatch(Splash.onSplashAnimationStart());
  setTimeout(() => completeAnimation(dispatch), 2000);
}

const completeAnimation = (dispatch: any) =>
  dispatch(Splash.onSplashAnimationComplete());

const didMount = (dispatch: any) =>
  startAnimation(dispatch);

export const Component = (): JSX.Element =>  {
  const dispatch = useDispatch()
  
  const {theme}= useSelector(stateToProps); 
  
  React.useEffect(() => didMount(dispatch), []);

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
