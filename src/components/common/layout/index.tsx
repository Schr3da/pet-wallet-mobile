import * as React from "react";

import {
  Dimensions, 
  ImageSourcePropType,
  KeyboardAvoidingView,
  ScrollView,
  View,
} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import {
  onChangeViewComponent,
  onGoBackNavigation,
  SubViewComponents, 
  ViewComponents
} from "../../../store/actions/navigation";

import {ICombinedReducerState} from "../../../store/reducers";
import {DisplayModes, onChangeDisplayMode, getDisplayMode} from "../../../store/actions/layout";
import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation, ILanguage, LanguageTypes} from "../../../language";
import {ImageButton} from "../image-button";
import {Header} from "../header";

import {applyStyles} from "./index.style";

interface IStateProps {
  title: string;
  description: string;
  theme: ThemeTypes,
  language: LanguageTypes;
  hasPets: boolean;
  path: string[];
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
  displayMode: DisplayModes;
  focus: string | null;
  screenWidth: number;
  screenHeight: number;
  isApplePlatform: boolean;
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  title: state.navigation.title,
  description: state.navigation.description,
  theme: state.layout.theme,  
  language: state.layout.language,
  displayMode: state.layout.displayMode,
  mainViewComponent: state.navigation.mainViewComponent,
  subViewComponent: state.navigation.subViewComponent,
  path: state.navigation.path,
  hasPets: state.navigation.hasPets, 
  focus: state.layout.focus,
  screenWidth: state.layout.screenWidth,
  screenHeight: state.layout.screenHeight,
  isApplePlatform: state.layout.isApplePlatform,
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
  language: ILanguage;
  languageType: LanguageTypes;
  isApplePlatform: boolean;
  hasPets: boolean;
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
  displayMode: DisplayModes;
  screenWidth: number;
  screenHeight: number;
}

interface IProps {
  imageSource: ImageSourcePropType;
  childRenderer: (props: ILayoutChildProps) => React.ReactFragment | null;
  footerRenderer?: (props: ILayoutChildProps) => React.ReactChild | null; 
}

const getChildProps = (
  props: IStateProps
): ILayoutChildProps => {
  const {theme, hasPets, mainViewComponent, subViewComponent, displayMode, screenWidth, screenHeight, isApplePlatform} = props;
  const languageType = props.language;
  const language = getTranslation(languageType);

  return {
    isApplePlatform,
    theme, 
    hasPets,
    mainViewComponent,
    subViewComponent,
    languageType,
    displayMode,
    language,
    screenWidth,
    screenHeight,
  };
};

const hasBackButton = (
  path: string[] 
) => path == null || path.length === 0 ? false :
  path[0] !== ViewComponents.welcome;

const hasSettingsButton = (
  path: string[] 
) => path == null || path.length === 0 ? false :
  path[0] !== ViewComponents.settings;

const handleBackPressed = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(onGoBackNavigation(language));

const handleSettingsPressed = (
  dispatch: any,
  language: LanguageTypes,
) => dispatch(
  onChangeViewComponent(
    ViewComponents.settings,
    SubViewComponents.none,
    language,
  ));

const handleDisplayModeChange = (
  dispatch: any,
) => ({window}: any) => { 
  const {width, height} = window;
  const mode = getDisplayMode(width, height);
  dispatch(onChangeDisplayMode(mode, width, height));
};

export const Layout = (
  props: IProps
): JSX.Element =>  {

  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  
  React.useEffect(() => {
    Dimensions.addEventListener("change", handleDisplayModeChange(dispatch));
    return () => Dimensions.removeEventListener("change", handleDisplayModeChange(dispatch));
  }, []);

  const {imageSource, childRenderer, footerRenderer} = props;
  const {displayMode, focus, path, theme, title, description, language, isApplePlatform} = stateProps;

  const childProps = getChildProps(stateProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <KeyboardAvoidingView
      behavior={isApplePlatform ? "padding" : "height" }
      style={styles.container}
      keyboardVerticalOffset={isApplePlatform ? 50 : 20}
    >
      <View style={styles.navigation}>
        <View style={styles.rowLeft}>
          {hasBackButton(path) === false ? null : 
          <ImageButton
            style={styles.backButton}
            source={
                theme === ThemeTypes.Dark ? 
                require("../../../../assets/png/dark/back-icon.png") :
                require("../../../../assets/png/light/back-icon.png")
            }
            onPress={() => handleBackPressed(dispatch, language)}
          />
        } 
        </View>
        <View style={styles.rowRight}>
          {hasSettingsButton(path) === false ? null : 
            <ImageButton
              style={styles.backButton}
              source={
                theme === ThemeTypes.Dark ? 
                require("../../../../assets/png/dark/settings-icon.png") :
                require("../../../../assets/png/light/settings-icon.png")
              }
              onPress={() => handleSettingsPressed(dispatch, language)}
            />
          }
        </View>
      </View>
      <ScrollView 
        bounces={true}
        style={styles.layoutWrapper}
        nestedScrollEnabled={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentViewWrapper}>
          <Header
            {...childProps}
            title={title}
            description={description}
            path={path}
            source={imageSource}
          />
          {childRenderer(childProps)} 
          {displayMode === DisplayModes.landscape &&
            footerRenderer && 
            footerRenderer(childProps)
          } 
        </View>
      </ScrollView>
      {displayMode === DisplayModes.portrait && 
        focus == null &&
        footerRenderer &&
        footerRenderer(childProps)
      }
    </KeyboardAvoidingView>
  );
};
