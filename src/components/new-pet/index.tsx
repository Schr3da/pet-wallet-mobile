import * as React from "react";

import * as InformationViews from "./information-view";

import {Layout} from "../common";
import {SubViewComponents} from "../../store/actions/navigation";

import * as PassViews from "./pass-view";

export const Component = () => {

  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-header-icon.png")}
      childRenderer={(props) => {
        switch (props.subViewComponent) {            
          case SubViewComponents.newPetInformation:
            return <InformationViews.ChildView {...props}/>;
          case SubViewComponents.newPetScan:
            return <PassViews.ChildView {...props}/>; 
          default: 
            return null;
        }
      }}
      footerRenderer={(props) => {
        switch (props.subViewComponent) {            
          case SubViewComponents.newPetInformation:
            return <InformationViews.Footer {...props} />;
          case SubViewComponents.newPetScan:
            return <PassViews.Footer {...props} />;
          default: 
            return null;
        }
      }}
    />
  );
}
