import * as React from "react";

import {Layout} from "../common";
import {Box} from "./box";
import {HelpBar} from "./help-bar";

export const Component = (): JSX.Element =>  {
  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        return (
          <React.Fragment>
            <Box {...props}/>
          </React.Fragment>
        );
      }}  
      footerRenderer={(props) => {
        return (
          <React.Fragment>
            <HelpBar {...props}/>
          </React.Fragment>
        );
      }}
    />
  );
};
