import * as React from "react";

import {useDispatch} from "react-redux";

import * as InformationViews from "./information-view";
import * as PassViews from "./pass-view";
import * as AttachmentViews from "./attachment";

import {Layout} from "../common";
import {SubViewComponents} from "../../store/actions/navigation";
import {onFocus} from "../../store/actions/layout";
import {onInputFieldChange, InputValues} from "../../store/actions/new-pet";
import {PetTypes} from "../../dto/pets";
import {getTranslation, LanguageTypes} from "../../language";
import {IPickerData} from "../common/picker";

const handlePickerValueSelected = (
  dispatch: any,
  id: string | null,
  value: InputValues,
) => {
  dispatch(onFocus(null, null));
  if (id == null) {
    return;
  }
  
  dispatch(onInputFieldChange(id, value));
};

const getPetTypes = (
  _: string | null,
  language: LanguageTypes,
): IPickerData[] => {
  const translation = getTranslation(language);
  return Object.values(PetTypes).map((v) => ({
    label: translation.animalTypes[v],
    value: translation.animalTypes[v],
  }));
};

export const Component = () => {
  const dispatch = useDispatch();

  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-header-icon.png")}
      onPickerChanged={(id, value) =>
        handlePickerValueSelected(dispatch, id, value)
      }
      getPickerData={getPetTypes}
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
