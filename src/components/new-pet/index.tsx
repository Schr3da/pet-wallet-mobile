import * as React from "react";

import {Layout} from "../common";
import {SubViewComponents} from "../../store/actions/navigation";

import {InformationView} from "./information-view";
import {PassView} from "./pass-view";

export const Component = () => {

  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-header-icon.png")}
      childRenderer={(props) => {
        switch (props.subViewComponent) {            
          case SubViewComponents.newPetInformation:
            return <InformationView {...props}/>;
          case SubViewComponents.newPetScan:
            return <PassView {...props}/>; 
          default: 
            return null;
        }
      }}  
    />
  );
}
