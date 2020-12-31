import * as React from "react";

import {useDispatch, useSelector} from "react-redux";
import {Text, View} from "react-native";

import {
  onSplashAnimationStart,
  onSplashAnimationComplete
} from "store/actions/splash";

import type {ICombinedReducerState} from "store/reducers";

import {styles} from './index.style';

const toProps = (
  state: ICombinedReducerState
) => state.splash;

const startAnimation = (dispatch: any) =>
  dispatch(onSplashAnimationStart());

const completeAnimation = (
  dispatch: any, 
  duration: number
) => setTimeout(() => { 
  dispatch(onSplashAnimationComplete())
}, duration);

export const Component = (): JSX.Element =>  {
  const dispatch = useDispatch()
  
  const {isAnimating, duration} = useSelector(toProps); 
  
  React.useEffect(
    () => {
      isAnimating === true ? 
        completeAnimation(dispatch, duration) : 
        startAnimation(dispatch);
    },
    [isAnimating]
  );

  return (
    <View style={styles.container}>
      <Text>{"value is: " + isAnimating}</Text>
    </View>
  );
}
