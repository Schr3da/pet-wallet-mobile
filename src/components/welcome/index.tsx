import React from 'react';

import {StatusBar} from 'expo-status-bar';
import {Text, View} from 'react-native';

import {styles} from './index.style';

export const App = (): JSX.Element =>  {
  return (
    <View style={styles.container}>
      <Text>My Quick Test</Text>
      <StatusBar style="auto" />
      <Text>My Quick Test</Text>
    </View>
  );
}
