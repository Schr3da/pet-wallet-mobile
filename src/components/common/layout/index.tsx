import * as React from "react";

import {ImageSourcePropType, KeyboardAvoidingView, Platform, View} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import {ScrollView} from "react-native-gesture-handler";

import {ICombinedReducerState} from "../../../store/reducers";

import {onChangeViewComponent, onGoBackNavigation, SubViewComponents, ViewComponents} from "../../../store/actions/navigation";

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
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  title: state.navigation.title,
  description: state.navigation.description,
  theme: state.layout.theme,  
  language: state.layout.language,
  mainViewComponent: state.navigation.mainViewComponent,
  subViewComponent: state.navigation.subViewComponent,
  path: state.navigation.path,
  hasPets: (state.pets.data || []).length !== 0, 
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
  language: ILanguage;
  languageType: LanguageTypes;
  hasPets: boolean;
  mainViewComponent: ViewComponents, 
  subViewComponent: SubViewComponents,
}

interface IProps {
  imageSource: ImageSourcePropType;
  childRenderer: (props: ILayoutChildProps) => React.ReactFragment;
  footerRenderer?: (props: ILayoutChildProps) => React.ReactChild; 
}

const getChildProps = (
  props: IStateProps
): ILayoutChildProps => {
  const language = getTranslation(props.language);
  return {
    theme: props.theme, 
    hasPets: props.hasPets,
    mainViewComponent: props.mainViewComponent,
    subViewComponent: props.subViewComponent,
    languageType: props.language,
    language,
  };
};

const isiOS = (): boolean => {
  const identifier = (Platform.OS || "").toLowerCase();
  return identifier === "ios";
}

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

export const Layout = (props: IProps): JSX.Element =>  {

  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  
  const {imageSource, childRenderer, footerRenderer} = props;
  const {path, theme, title, description, language} = stateProps;

  const childProps = getChildProps(stateProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <KeyboardAvoidingView
      behavior={isiOS() ? "padding" : "height" }
      style={styles.container}
      keyboardVerticalOffset={50}
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
        style={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Header
          {...childProps}
          title={title}
          description={description}
          path={path}
          source={imageSource}
        />
        {childRenderer(childProps)}  
      </ScrollView>
      {footerRenderer && footerRenderer(childProps)}
    </KeyboardAvoidingView>
  );
};