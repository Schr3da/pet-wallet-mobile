import * as React from "react";

import {SafeAreaView, StatusBar, View} from "react-native";
import {useSelector} from "react-redux";

import {
  Help,
  NewPet,
  Settings,
  Splash,
  TermsAndConditions,
  Welcome,
  PetDetails,
} from "../components";

import {ICombinedReducerState} from "../store/reducers";
import {ViewComponents} from "../store/actions/navigation";
import {createStyle, ThemeTypes, getColors} from "../theme";

import {applyStyles} from "./index.style";
import {DisplayModes} from "../store/actions/layout";

interface IProps {
  mainViewComponent: ViewComponents;
  theme: ThemeTypes;
  isApplePlatform: boolean;
  displayMode: DisplayModes;
}

const stateToProps = (state: ICombinedReducerState): IProps => ({
  mainViewComponent: state.navigation.mainViewComponent,
  theme: state.layout.theme,
  isApplePlatform: state.layout.isApplePlatform,
  displayMode: state.layout.displayMode,
});

export const Route = (): JSX.Element => {
  const {displayMode, isApplePlatform, mainViewComponent, theme} = useSelector(stateToProps);

  const styles = createStyle(theme, applyStyles(isApplePlatform, displayMode));
  const colors = getColors(theme);

  let childComponent: React.ReactElement;

  switch (mainViewComponent) {
    case ViewComponents.splash:
      childComponent = <Splash.Component />;
      break;
    case ViewComponents.welcome:
      childComponent = <Welcome.Component />;
      break;
    case ViewComponents.newPet:
      childComponent = <NewPet.Component />;
      break;
    case ViewComponents.petDetails:
      childComponent = <PetDetails.Component />;
      break;
    case ViewComponents.help:
      childComponent = <Help.Component />;
      break;
    case ViewComponents.settings:
      childComponent = <Settings.Component />;
      break;
    case ViewComponents.termsAndConditions:
      childComponent = <TermsAndConditions.Component />;
      break;
    default:
      childComponent = <View />;
  }

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        translucent
        backgroundColor={colors.color1}
        barStyle={theme === ThemeTypes.Dark ? "light-content" : "dark-content"}
      />
      <View style={styles.container}>{childComponent}</View>
    </SafeAreaView>
  );
};
