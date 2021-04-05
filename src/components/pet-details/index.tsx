import * as React from "react";

import {View} from "react-native";
import {useSelector} from "react-redux";

import * as InformationView from "./information";

import {createStyle} from "../../theme";
import {Layout, ScanResultViews} from "../common";
import {ErrorTypes} from "../../enums/layout";
import {SubViewComponents, ViewComponents} from "../../enums/navigation";
import {onSetErrorCode} from "../../store/actions/layout";
import {ICombinedReducerState} from "../../store/reducers";

import {applyFooterStyles} from "./index.style";

const stateToProps = (state: ICombinedReducerState) => ({
  data: (state.pets.data || []).find((p) => state.pets.selectedId === p.id),
});

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const Component = (): JSX.Element => {
  const {data} = useSelector(stateToProps);

  return (
    <Layout
      hasHeader={false}
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        const {mainViewComponent, subViewComponent} = props;

        if (mainViewComponent !== ViewComponents.petDetails) {
          return null;
        }

        if (data == null) {
          return <View></View>;
        }

        if (
          subViewComponent === SubViewComponents.none ||
          subViewComponent === SubViewComponents.petDetailsEdit
        ) {
          return <InformationView.Component {...props} data={data} />;
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
        return <InformationView.Dialogs {...props} />;
      }}
    />
  );
};
