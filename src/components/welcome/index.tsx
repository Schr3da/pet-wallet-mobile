import * as React from "react";

import {Layout} from "../common";

import {Box} from "./box";

import {HelpBar} from "./help-bar";

export const Component = (): JSX.Element =>  {
  return (
    <Layout
      imageSource={require("../../../assets/png/app-icon.png")}
      render={(props) => {
        return (
          <React.Fragment>
            <Box {...props}/>
            <HelpBar {...props}/>
          </React.Fragment>
        );
      }}  
    />
  );
};
