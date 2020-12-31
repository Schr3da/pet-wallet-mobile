import * as React from 'react';

import {Provider} from "react-redux";

import {Splash} from "./components";
import {getStore} from "./store";

export const App = (): JSX.Element =>  {
  const store = getStore();
  return (
    <Provider store={store}>
      <Splash.Component/>
    </Provider>
  );
}
