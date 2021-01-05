import * as React from "react";

import {Image, View} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import type {ICombinedReducerState} from "../../store/reducers";

import {Splash} from "../../store/actions";

import {createStyle, ThemeTypes} from "../../theme";

import {LanguageTypes} from "language";

import {applyStyles} from "./index.style";

interface IProps {
  isAnimating: boolean;
  theme: ThemeTypes;
  hasPets: boolean;
  language: LanguageTypes;
}
  
const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  isAnimating: state.splash.isAnimating,
  language: state.layout.language,
  theme: state.layout.theme,
  hasPets: state.pets.data.length !== 0,
});

const startAnimation = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) => {
  dispatch(Splash.onSplashAnimationStart());
  setTimeout(() => completeAnimation(dispatch, hasPets, language), 2000);
}

const completeAnimation = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) =>
  dispatch(Splash.onSplashAnimationComplete(hasPets, language));

const didMount = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) => startAnimation(dispatch, hasPets, language);

export const Component = (): JSX.Element =>  {
  const dispatch = useDispatch()
  
  const {hasPets, language, theme}= useSelector(stateToProps); 
  
  React.useEffect(() => 
    didMount(dispatch, hasPets, language),
  []);

  const styles = createStyle(theme, applyStyles); 
  
  return (
    <View style={styles.container}>
      <Image 
        source={require("../../../assets/png/welcome-header-icon.png")}
        style={styles.appIcon}  
      />
    </View>
  );
};
