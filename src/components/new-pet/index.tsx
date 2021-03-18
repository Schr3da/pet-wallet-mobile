import * as React from "react";

import {useDispatch} from "react-redux";

import * as InformationViews from "./information-view";
import * as PassViews from "./pass-view";
import * as ScanResultViews from "./scan-result-view";

import {Layout} from "../common";
import {onFocus} from "../../store/actions/layout";
import {onInputFieldChange, InputValues} from "../../store/actions/new-pet";
import {PetTypes} from "../../dto/pets";
import {getTranslation, LanguageTypes} from "../../language";
import {IPickerData} from "../common/picker";
import {SubViewComponents} from "../../enums/navigation";

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
          case SubViewComponents.newScanResult:
            return <ScanResultViews.ChildView {...props} />;
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
          case SubViewComponents.newScanResult:
            return <ScanResultViews.Footer {...props} />;
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
          case SubViewComponents.newScanResult:
            return <ScanResultViews.Dialogs {...props} />;
          default:
            return null;
        }
      }}
    />
  );
};
