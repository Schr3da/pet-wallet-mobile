import * as React from "react";

import {View} from "react-native";
import {useSelector} from "react-redux";

import {EditView, Footer, Dialogs} from "./edit";
import {ReadOnlyView} from "./read-only";

import {createStyle} from "../../theme";
import {Layout, ScanResultViews} from "../common";
import {ErrorTypes} from "../../enums/layout";
import {SubViewComponents, ViewComponents} from "../../enums/navigation";
import {onSetErrorCode} from "../../store/actions/layout";
import {ICombinedReducerState} from "../../store/reducers";

import {applyFooterStyles} from "./index.style";

const stateToProps = (state: ICombinedReducerState) => ({
  isEditing: state.petDetails.isEditMode,
  data: (state.pets.data || []).find((p) => state.pets.selectedId === p.id),
});

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

export const Component = (): JSX.Element => {
  const {isEditing, data} = useSelector(stateToProps);

  return (
    <Layout
      hasHeader={false}
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        if (data == null) {
          return <View></View>;
        }

        return (
          <React.Fragment>
            {isEditing ? (
              <EditView {...props} data={data} />
            ) : (
              <ReadOnlyView {...props} data={data} />
            )}
          </React.Fragment>
        );
      }}
      footerRenderer={(props) => {
        const {theme, subViewComponent} = props;

        const styles = createStyle(theme, applyFooterStyles);

        return (
          <View style={styles.container}>
            {subViewComponent === SubViewComponents.newScanResult ? (
              <ScanResultViews.Footer {...props} onSave={() => undefined} />
            ) : isEditing ? (
              <Footer {...props} />
            ) : null}
          </View>
        );
      }}
      dialogRenderer={(props) => {
        if (isEditing === false) {
          return null;
        }
        return <Dialogs {...props} />;
      }}
    />
  );
};
