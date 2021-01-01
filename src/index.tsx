import * as React from 'react';

import {Provider} from "react-redux";

import {Component} from "./router";
import {getStore} from "./store";

export const App = (): JSX.Element =>  {
  const store = getStore();
  return (
    <Provider store={store}>
      <Component/>
    </Provider>
  );
}
