import * as React from "react";

import {Layout} from "../common";
import {Box} from "./box";
import {HelpBar} from "./help-bar";

export const Component = (): JSX.Element =>  {
  return (
    <Layout
      title="Willkommen"
      description="Bitte registriere zunächst dein Haustier um fortzufahren"
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
