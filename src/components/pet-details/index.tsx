import * as React from "react";

import {View} from "react-native";
import {useSelector, useDispatch} from "react-redux";

import * as InformationView from "./information";

import {createStyle, ThemeTypes} from "../../theme";
import {Layout, ScanResultViews, NoData} from "../common";
import {ErrorTypes, InputTypes} from "../../enums/layout";
import {SubViewComponents} from "../../enums/navigation";
import {
  onSetErrorCode,
  onSetPickerVisibility,
} from "../../store/actions/layout";
import {ICombinedReducerState} from "../../store/reducers";

import {applyFooterStyles} from "./index.style";
import {ImagePickerTypes} from "../../enums/image";
import {ILanguage, LanguageTypes, getTranslation} from "../../language";
import {IPickerData} from "../common/picker";
import {prepareImageInput} from "../common/utils";
import {onScan} from "../../store/actions/pet-details";

const stateToProps = (state: ICombinedReducerState) => ({
  data: (state.pets.data || []).find((p) => state.pets.selectedId === p.id),
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

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const {data} = useSelector(stateToProps);

  return (
    <Layout
      hasHeader={false}
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      getPickerData={(
        _: string | null,
        language: LanguageTypes,
        view: SubViewComponents,
      ) => {
        const translation = getTranslation(language);

        switch (view) {
          case SubViewComponents.none:
            return getImagePickerData(translation);
          default:
            return [];
        }
      }}
      onPickerChanged={async (_, value, view) => {
        dispatch(onSetPickerVisibility(false, InputTypes.picker));

        switch (view) {
          case SubViewComponents.none:
            const result = await prepareImageInput(value as any, 1600, 1600);
            return result == null || data == null
              ? null
              : dispatch(onScan(data.id, result));
          default:
            return;
        }
      }}
      childRenderer={(props) => {
        const {subViewComponent, theme, language} = props;

        if (data == null) {
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
          return <InformationView.ChildView {...props} data={data} />;
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
            <ScanResultViews.Footer {...props} onSave={() => undefined} />
          );
        }

        return <View style={styles.container}>{child}</View>;
      }}
      dialogRenderer={(props) => {
        if (data == null) {
          return null;
        }

        const {subViewComponent} = props;

        if (subViewComponent === SubViewComponents.none) {
          return <InformationView.Dialogs {...props} data={data} />;
        } else if (subViewComponent === SubViewComponents.petDetailsEdit) {
          return <InformationView.Dialogs {...props} data={data} />;
        } else {
          return null;
        }
      }}
    />
  );
};
