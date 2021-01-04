import React from 'react';

import {View} from 'react-native';
import {useSelector} from "react-redux";

import {Help, NewPet, Splash, Welcome} from "../components";
import {ICombinedReducerState} from "../store/reducers";
import {ViewComponents} from "../store/actions/layout";

interface IProps {
  mainViewComponent: ViewComponents;
}

const stateToProps = (
  state: ICombinedReducerState
): IProps => ({
  mainViewComponent: state.layout.mainViewComponent,
});

export const Route = (): JSX.Element =>  {
  const {mainViewComponent} = useSelector(stateToProps);

  switch (mainViewComponent) {
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
