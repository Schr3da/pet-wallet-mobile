import * as React from "react";


import {createStyleWithoutTheme} from "../../theme";
import {Layout, CardsContainer} from "../common";

import {applyStyles} from "./index.style";

export const Component = (): JSX.Element =>  {

  const styles = createStyleWithoutTheme(applyStyles());

  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        return (
          <React.Fragment>
            <CardsContainer {...props}/>
          </React.Fragment>
        );
      }}  
      footerRenderer={(props) => {
        return (
          <React.Fragment>
          </React.Fragment>
        );
      }}
    />
  );
};
