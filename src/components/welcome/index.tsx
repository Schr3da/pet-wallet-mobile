import * as React from "react";

import {createStyleWithoutTheme} from "../../theme";
import {Layout, CardsContainer} from "../common";
import {AddPetBar} from "./add-pet-bar";
import {Box} from "./box";
import {HelpBar} from "./help-bar";

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
            {hasPets === false ? <Box {...props}/> : 
              <CardsContainer {...props}
                onCardPress={(id, measures) => console.log("card press", id, measures)}
                onSharePress={(id, measures) => console.log("share press", id, measures)} 
              />
            }
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
