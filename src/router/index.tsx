import * as React from 'react';

import {SafeAreaView, View} from 'react-native';

import {useSelector} from "react-redux";

import {Help, NewPet, Settings, Splash, Welcome} from "../components";

import {ICombinedReducerState} from "../store/reducers";

import {ViewComponents} from "../store/actions/navigation";

import {createStyle, ThemeTypes} from "../theme";

import {applyStyles} from "./index.style";

interface IProps {
  mainViewComponent: ViewComponents;
  theme: ThemeTypes;
}

const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  mainViewComponent: state.navigation.mainViewComponent,
  theme: state.layout.theme,
});

export const Route = (): JSX.Element =>  {
  const {mainViewComponent, theme} = useSelector(stateToProps);

  const styles = createStyle(theme, applyStyles);

  let childComponent: React.ReactElement;

  switch (mainViewComponent) {
    case ViewComponents.splash: 
      childComponent = <Splash.Component/>;
      break;
    case ViewComponents.welcome:
      childComponent = <Welcome.Component/>;
      break;
    case ViewComponents.newPet:
      childComponent = <NewPet.Component/>;
      break;
    case ViewComponents.help:
      childComponent = <Help.Component/>;
      break;
    case ViewComponents.settings:
      childComponent = <Settings.Component/>;
      break;
    default:
      childComponent = <View />;
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.container}>
        {childComponent}
      </View>
    </SafeAreaView>
  );
};
