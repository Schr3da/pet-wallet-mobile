import * as React from "react";

import * as InformationViews from "./information-view";
import * as PassViews from "./pass-view";
import * as AttachmentViews from "./attachment";

import {Layout} from "../common";
import {SubViewComponents} from "../../store/actions/navigation";

export const Component = () => {
  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-header-icon.png")}
      childRenderer={(props) => {
        switch (props.subViewComponent) {
          case SubViewComponents.newPetInformation:
            return <InformationViews.ChildView {...props} />;
          case SubViewComponents.newPetScan:
            return <PassViews.ChildView {...props} />;
          case SubViewComponents.newAttachment:
            return <AttachmentViews.ChildView {...props} />;
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
          case SubViewComponents.newAttachment:
            return <AttachmentViews.Footer {...props} />;
          default:
            return null;
        }
      }}
      dialogRenderer={(props) => {
        switch (props.subViewComponent) {
          case SubViewComponents.newPetInformation:
            return <InformationViews.Dialogs {...props} />;
          case SubViewComponents.newPetScan:
            return <PassViews.Dialogs {...props} />;
          case SubViewComponents.newAttachment:
            return <AttachmentViews.Dialogs {...props} />;
          default:
            return null;
        }
      }}
    />
  );
};
