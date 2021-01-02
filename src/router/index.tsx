import React from 'react';

import {View} from 'react-native';
import {useSelector} from "react-redux";

import {Help, NewPet, Splash, Welcome} from "../components";
import {ICombinedReducerState} from "../store/reducers";
import {ViewComponents} from "../store/actions/general";

interface IProps {
  currentViewComponent: ViewComponents;
}

const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  currentViewComponent: state.general.currentViewComponent,
});

export const Route = (): JSX.Element =>  {
  const {currentViewComponent} = useSelector(stateToProps);

  switch (currentViewComponent) {
    case ViewComponents.splash: 
      return <Splash.Component/>;
    case ViewComponents.welcome:
      return <Welcome.Component/>;
    case ViewComponents.newPet:
      return <NewPet.Component/>;
    case ViewComponents.help:
      return <Help.Component/>;
    default:
      return <View />;
  };
};
