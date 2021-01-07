import * as React from 'react';

import {Provider} from "react-redux";

import {Route} from "./router";

import {getStore} from "./store";

export const App = (): JSX.Element =>  {
  const store = getStore();
  return (
    <React.Fragment>
        <Provider store={store}>
          <Route/>
        </Provider>
    </React.Fragment>
  );
}
