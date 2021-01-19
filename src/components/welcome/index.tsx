import * as React from "react";


import {createStyleWithoutTheme} from "../../theme";
import {AddPetBar} from "./add-pet-bar";
import {Layout} from "../common";
import {Box} from "./box";
import {HelpBar} from "./help-bar";
import {CardsContainer} from "./cards-container";

import {applyStyles} from "./index.style";

export const Component = (): JSX.Element =>  {

  const styles = createStyleWithoutTheme(applyStyles());

  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        const {hasPets} = props;
        return (
          <React.Fragment>
            {hasPets === false ? <Box {...props}/> : <CardsContainer {...props}/>}
          </React.Fragment>
        );
      }}  
      footerRenderer={(props) => {
        const {hasPets} = props;
        return (
          <React.Fragment>
            {hasPets === false ? <HelpBar {...props}/> : <AddPetBar {...props} style={styles}/>}
          </React.Fragment>
        );
      }}
    />
  );
};
