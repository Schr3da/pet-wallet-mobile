import * as React from "react";
import {View} from "react-native";

import {useDispatch} from "react-redux";

import * as InformationViews from "./information-view";
import * as PassViews from "./pass-view";

import {Layout, ScanResultViews} from "../common";
import {onFocus} from "../../store/actions/layout";
import {onInputFieldChange, InputValues} from "../../store/actions/new-pet";
import {PetTypes} from "../../dto/pets";
import {getTranslation, LanguageTypes} from "../../language";
import {IPickerData} from "../common/picker";
import {SubViewComponents} from "../../enums/navigation";
import {createStyle} from "../../theme";

import {applyFooterStyles} from "./index.style";

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

        const {theme} = props;

        const styles = createStyle(theme, applyFooterStyles);

        let component = null;
        switch (props.subViewComponent) {
          case SubViewComponents.newPetInformation:
            component = <InformationViews.Footer {...props} />;
            break;
          case SubViewComponents.newPetScan:
            component = <PassViews.Footer {...props} />;
            break;
          case SubViewComponents.newScanResult:
            component = <ScanResultViews.Footer {...props} />;
            break;
          default:
            component = null;
        }

        return (
          <View style={styles.container}>
            {component}
          </View>
        );
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
