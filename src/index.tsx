import * as React from 'react';

import {SafeAreaView} from 'react-native';

import {Provider} from "react-redux";

import {createStyleWithoutTheme} from 'theme';

import {Route} from "./router";

import {getStore} from "./store";

import {applyStyles} from "./index.style";

export const App = (): JSX.Element =>  {
  const store = getStore();

  const styles = createStyleWithoutTheme(applyStyles);

  return (
    <SafeAreaView style={styles}>
      <Provider store={store}>
        <Route/>
      </Provider>
    </SafeAreaView>
  );
}
