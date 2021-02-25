import * as React from "react";

import {Image, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import type {ICombinedReducerState} from "../../store/reducers";

import {Loader} from "../common/loader";
import {Splash, Navigation} from "../../store/actions";
import {createStyle, ThemeTypes} from "../../theme";
import {LanguageTypes} from "../../language";

import {applyStyles} from "./index.style";

import {initStateFromDatabase} from "../../store/actions/database";

interface IProps {
  isAnimating: boolean;
  theme: ThemeTypes;
  hasPets: boolean;
  language: LanguageTypes;
  hasLoadedDatabase: boolean;
}

const stateToProps = (state: ICombinedReducerState): IProps => ({
  isAnimating: state.splash.isAnimating,
  language: state.layout.language,
  theme: state.layout.theme,
  hasPets: state.navigation.hasPets,
  hasLoadedDatabase: state.database.hasLoadedDatabase,
});

const startAnimation = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) => {
  dispatch(Splash.onSplashAnimationStart());
  setTimeout(() => completeAnimation(dispatch, hasPets, language), 2000);
};

const completeAnimation = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) => dispatch(Navigation.onShowHomeComponent(language, hasPets));

const didMount = (dispatch: any) => dispatch(initStateFromDatabase());

const initAnimation = (
  dispatch: any,
  hasPets: boolean,
  language: LanguageTypes,
) => startAnimation(dispatch, hasPets, language);

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const {hasPets, hasLoadedDatabase, language, theme} = useSelector(
    stateToProps,
  );

  React.useEffect(() => {
    hasLoadedDatabase == false
      ? didMount(dispatch)
      : initAnimation(dispatch, hasPets, language);
  }, [hasLoadedDatabase]);

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      {hasLoadedDatabase === false ? (
        <Loader theme={theme} />
      ) : (
        <Image
          source={require("../../../assets/png/welcome-header-icon.png")}
          style={styles.appIcon}
        />
      )}
    </View>
  );
};
