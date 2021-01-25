import * as React from "react";

import {View} from "react-native";
import {useDispatch} from "react-redux";

import {LanguageTypes} from "../../../language";
import {ThemeTypes, createStyle} from "../../../theme";
import {ImageButton} from "../image-button";

import {
  onGoBackNavigation,
  onChangeViewComponent,
  ViewComponents,
  SubViewComponents,
} from "../../../store/actions/navigation";

import {applyStyles} from "./index.style";

const handleBackPressed = (dispatch: any, language: LanguageTypes) =>
  dispatch(onGoBackNavigation(language));

const handleSettingsPressed = (dispatch: any, language: LanguageTypes) =>
  dispatch(
    onChangeViewComponent(
      ViewComponents.settings,
      SubViewComponents.none,
      language,
    ),
  );

interface IProps {
  hasBackButton: boolean;
  hasSettingsButton: boolean;
  language: LanguageTypes;
  theme: ThemeTypes;
}

export const Navigation = (props: IProps) => {
  const dispatch = useDispatch();

  const {hasBackButton, hasSettingsButton, language, theme} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.navigation}>
      <View style={styles.rowLeft}>
        {hasBackButton === false ? null : (
          <ImageButton
            style={styles.backButton}
            source={
              theme === ThemeTypes.Dark
                ? require("../../../../assets/png/dark/back-icon.png")
                : require("../../../../assets/png/light/back-icon.png")
            }
            onPress={() => handleBackPressed(dispatch, language)}
          />
        )}
      </View>
      <View style={styles.rowRight}>
        {hasSettingsButton === false ? null : (
          <ImageButton
            style={styles.backButton}
            source={
              theme === ThemeTypes.Dark
                ? require("../../../../assets/png/dark/settings-icon.png")
                : require("../../../../assets/png/light/settings-icon.png")
            }
            onPress={() => handleSettingsPressed(dispatch, language)}
          />
        )}
      </View>
    </View>
  );
};
