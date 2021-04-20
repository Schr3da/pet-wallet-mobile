import * as React from "react";

import {View} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import * as InformationView from "./information";

import {createStyle, ThemeTypes} from "../../theme";
import {Layout, ScanResultViews, NoData} from "../common";
import {InputTypes} from "../../enums/layout";
import {SubViewComponents} from "../../enums/navigation";
import {ICombinedReducerState} from "../../store/reducers";

import {ImagePickerTypes} from "../../enums/image";
import {ILanguage, LanguageTypes, getTranslation} from "../../language";
import {IPickerData} from "../common/picker";
import {prepareImageInput} from "../common/utils";
import {onScan} from "../../store/actions/pet-details";
import {onSetPickerVisibility, onFocus} from "../../store/actions/layout";
import {InputValues, InputIds} from "../../enums/input";

import {applyFooterStyles} from "./index.style";
import {onInputChange} from "../../store/actions/inputs";
import {PetTypes} from "../../dto/pets";
import {onSaveScanResult} from "../../store/actions/pet-details";

const stateToProps = (state: ICombinedReducerState) => ({
  selectedId: state.pets.selectedId!,
});

const getImagePickerData = (language: ILanguage): IPickerData[] => [
  {
    label: language.common.camera,
    value: ImagePickerTypes.camera,
  },
  {
    label: language.common.photoLibrary,
    value: ImagePickerTypes.picker,
  },
];

const requestPickerData = (
  id: string | null,
  language: LanguageTypes,
  view: SubViewComponents,
) => {
  const translation = getTranslation(language);

  switch (view) {
    case SubViewComponents.none:
      return getImagePickerData(translation);
    case SubViewComponents.petDetailsEdit:
      if (id === InputIds.animalType) {
        return Object.values(PetTypes).map((v) => ({
          label: translation.animalTypes[v],
          value: translation.animalTypes[v],
        }));
      }
    default:
      return [];
  }
};

const handlePickerChanged = async (
  dispatch: any,
  petId: string,
  inputId: string | null,
  value: InputValues,
  view: SubViewComponents,
) => {
  dispatch(onSetPickerVisibility(false, InputTypes.picker));
  dispatch(onFocus(null, null));

  switch (view) {
    case SubViewComponents.none:
      const result = await prepareImageInput(value as any, 1600, 1600);
      return result == null || petId == null
        ? null
        : dispatch(onScan(petId, result));
    case SubViewComponents.petDetailsEdit:
      return inputId == null ? null : dispatch(onInputChange(inputId, value));
    default:
      return;
  }
};

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const {selectedId} = useSelector(stateToProps);

  return (
    <Layout
      hasHeader={false}
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      getPickerData={requestPickerData}
      onPickerChanged={async (id, value, view) =>
        handlePickerChanged(dispatch, selectedId, id, value, view)
      }
      childRenderer={(props) => {
        const {subViewComponent, theme, language} = props;

        if (selectedId == null) {
          return (
            <NoData
              theme={theme}
              title={language.petDetails.none.noDataTitle}
              image={
                theme === ThemeTypes.Dark
                  ? require("../../../assets/png/dark/new-pet-profile-icon.png")
                  : require("../../../assets/png/light/new-pet-profile-icon.png")
              }
            />
          );
        } else if (
          subViewComponent === SubViewComponents.none ||
          subViewComponent === SubViewComponents.petDetailsEdit
        ) {
          return <InformationView.ChildView {...props} id={selectedId} />;
        } else if (subViewComponent === SubViewComponents.newScanResult) {
          return <ScanResultViews.ChildView {...props} />;
        } else {
          return null;
        }
      }}
      footerRenderer={(props) => {
        const {theme, subViewComponent} = props;

        const styles = createStyle(theme, applyFooterStyles);

        let child = null;
        if (subViewComponent === SubViewComponents.none) {
          child = <InformationView.Footer {...props} />;
        } else if (subViewComponent === SubViewComponents.petDetailsEdit) {
          child = <InformationView.Footer {...props} />;
        } else if (subViewComponent === SubViewComponents.newScanResult) {
          child = (
            <ScanResultViews.Footer
              {...props}
              onSave={() => dispatch(onSaveScanResult())}
            />
          );
        }

        return <View style={styles.container}>{child}</View>;
      }}
      dialogRenderer={(props) => {
        if (selectedId == null) {
          return null;
        }

        const {subViewComponent} = props;

        if (subViewComponent === SubViewComponents.none) {
          return <InformationView.Dialogs {...props} id={selectedId} />;
        } else if (subViewComponent === SubViewComponents.petDetailsEdit) {
          return <InformationView.Dialogs {...props} id={selectedId} />;
        } else {
          return null;
        }
      }}
    />
  );
};
