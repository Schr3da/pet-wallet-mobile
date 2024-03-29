import * as React from "react";

import {getStore} from "./store";

import {Provider} from "react-redux";

import {Route} from "./router";

export const App = (): JSX.Element => {
  const store = getStore();

  return (
    <React.Fragment>
      <Provider store={store}>
        <Route />
      </Provider>
    </React.Fragment>
  );
};
