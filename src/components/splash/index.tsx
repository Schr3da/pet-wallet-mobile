import * as React from "react";

import {View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ICombinedReducerState} from "../../store/reducers";
import {Loader} from "../common/loader";
import {Splash, Navigation} from "../../store/actions";
import {createStyle, ThemeTypes} from "../../theme";
import {LanguageTypes} from "../../language";

import {initStateFromDatabase} from "../../store/actions/database";

import {applyStyles} from "./index.style";

interface IProps {
  isAnimating: boolean;
  theme: ThemeTypes;
  hasPets: boolean;
  language: LanguageTypes;
  hasLoadedDatabase: boolean;
}

const stateToProps = (state: ICombinedReducerState): IProps => {
  return {
    isAnimating: state.splash.isAnimating,
    language: state.layout.language,
    theme: state.layout.theme,
    hasPets: state.navigation.hasPets,
    hasLoadedDatabase: state.database.hasLoadedDatabase,
  };
};

const startAnimation = (dispatch: any) => {
  dispatch(Splash.onSplashAnimationStart());
  setTimeout(() => completeAnimation(dispatch), 2000);
};

const completeAnimation = (dispatch: any) =>
  dispatch(Navigation.onShowHomeComponent());

const didMount = (dispatch: any) => dispatch(initStateFromDatabase());

const initAnimation = (dispatch: any) => startAnimation(dispatch);

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const {hasLoadedDatabase, theme} = useSelector(stateToProps);

  React.useEffect(() => {
    hasLoadedDatabase === false ? didMount(dispatch) : initAnimation(dispatch);
  }, [hasLoadedDatabase]);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <Loader theme={theme} isAnimating={true} isVisible={true}/>
    </View>
  );
};
