import * as React from "react";
import {View} from "react-native";

import {useDispatch} from "react-redux";

import * as InformationViews from "./information-view";
import * as PassViews from "./pass-view";

import {Layout, ScanResultViews} from "../common";
import {onFocus} from "../../store/actions/layout";
import {PetTypes} from "../../dto/pets";
import {getTranslation, LanguageTypes} from "../../language";
import {IPickerData} from "../common/picker";
import {SubViewComponents} from "../../enums/navigation";
import {createStyle} from "../../theme";

import {applyFooterStyles} from "./index.style";
import {getStore} from "../../store";

import {onSaveScanResult} from "../../store/actions/new-pet";
import {InputValues} from "../../enums/input";
import {onInputChange} from "../../store/actions/inputs";

const handlePickerValueSelected = (
  dispatch: any,
  id: string | null,
  value: InputValues,
) => {
  dispatch(onFocus(null, null));

  if (id == null) {
    return;
  }

  dispatch(onInputChange(id, value));
};

const getPetTypes = (
  _: string | null,
  language: LanguageTypes,
  subViewComponent: SubViewComponents,
): IPickerData[] => {
  const translation = getTranslation(language);
  const state = getStore().getState();

  if (subViewComponent === SubViewComponents.newScanResult) {
    return state.scan.result == null
      ? []
      : state.scan.result.suggestions[language].map((r) => ({
          label: r.shortInfo,
          value: r.shortInfo,
        }));
  }

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
            component = (
              <ScanResultViews.Footer
                {...props}
                onSave={() => dispatch(onSaveScanResult())}
              />
            );
            break;
          default:
            component = null;
        }

        return <View style={styles.container}>{component}</View>;
      }}
      dialogRenderer={(props) => {
        switch (props.subViewComponent) {
          case SubViewComponents.newPetInformation:
            return <InformationViews.Dialogs {...props} />;
          case SubViewComponents.newPetScan:
            return <PassViews.Dialogs {...props} />;
          case SubViewComponents.newScanResult:
            return (
              <ScanResultViews.Dialogs
                {...props}
                onSave={() => dispatch(onSaveScanResult())}
              />
            );
          default:
            return null;
        }
      }}
    />
  );
};
