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
import {createStyle, ThemeTypes, getColors} from "../theme";
import {ViewComponents} from "../enums/navigation";
import {DisplayModes} from "../enums/layout";

import {applyStyles} from "./index.style";
import {Loader} from "../components/common/loader";

interface IProps {
  mainViewComponent: ViewComponents;
  theme: ThemeTypes;
  isApplePlatform: boolean;
  displayMode: DisplayModes;
  isLoading: boolean;
}

const stateToProps = (state: ICombinedReducerState): IProps => ({
  mainViewComponent: state.navigation.mainViewComponent,
  theme: state.layout.theme,
  isApplePlatform: state.layout.isApplePlatform,
  displayMode: state.layout.displayMode,
  isLoading: state.layout.isLoading,
});

export const Route = (): JSX.Element => {
  const {
    displayMode,
    isApplePlatform,
    mainViewComponent,
    theme,
    isLoading,
  } = useSelector(stateToProps);

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
      <Loader
        style={styles.loader}
        theme={theme}
        isVisible={isLoading}
        isAnimating={true}
      />
    </SafeAreaView>
  );
};
