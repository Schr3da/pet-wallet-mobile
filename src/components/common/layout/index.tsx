import * as React from "react";

import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  KeyboardAvoidingView,
  View,
} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import {
  SubViewComponents,
  ViewComponents,
} from "../../../store/actions/navigation";

import {ICombinedReducerState} from "../../../store/reducers";
import {
  DisplayModes,
  onChangeDisplayMode,
  getDisplayMode,
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
} from "../../../store/actions/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation, ILanguage, LanguageTypes} from "../../../language";
import {Navigation} from "../navigation";
import {Header} from "../header";
import {Error} from "../error";
import {Notification} from "../notification";

import {applyStyles} from "./index.style";

interface IStateProps {
  title: string;
  description: string;
  theme: ThemeTypes;
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
  errorType: ErrorTypes | null;
  notificationType: NotificationTypes | null;
  dialogContentType: DialogContentTypes | null;
}

const stateToProps = (state: ICombinedReducerState): IStateProps => ({
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
  errorType: state.layout.errorType,
  notificationType: state.layout.notificationType,
  dialogContentType: state.layout.dialogContentType,
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
  hasError: boolean;
  hasNotification: boolean;
  dialogContentType: DialogContentTypes | null;
}

interface IProps {
  imageSource: ImageSourcePropType;
  childRenderer: (props: ILayoutChildProps) => React.ReactFragment | null;
  footerRenderer?: (props: ILayoutChildProps) => React.ReactChild | null;
  dialogRenderer?: (props: ILayoutChildProps) => React.ReactChild | null;
  hasHeader?: boolean;
  onScroll?: any;
}

const getChildProps = (props: IStateProps): ILayoutChildProps => {
  const {
    theme,
    hasPets,
    mainViewComponent,
    subViewComponent,
    displayMode,
    screenWidth,
    screenHeight,
    isApplePlatform,
    errorType,
    notificationType,
    dialogContentType,
  } = props;

  const hasError = errorType != null;
  const hasNotification = notificationType != null;
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
    hasError,
    hasNotification,
    dialogContentType,
  };
};

const hasBackButton = (path: string[]) =>
  path == null || path.length === 0
    ? false
    : path[0] !== ViewComponents.welcome;

const hasSettingsButton = (path: string[]) =>
  path == null || path.length === 0
    ? false
    : path[0] !== ViewComponents.settings;

const handleDisplayModeChange = (dispatch: any) => ({window}: any) => {
  const {width, height} = window;
  const mode = getDisplayMode(width, height);
  dispatch(onChangeDisplayMode(mode, width, height));
};

export const Layout = (props: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);

  React.useEffect(() => {
    Dimensions.addEventListener("change", handleDisplayModeChange(dispatch));
    return () =>
      Dimensions.removeEventListener(
        "change",
        handleDisplayModeChange(dispatch),
      );
  }, []);

  const {
    hasHeader,
    imageSource,
    onScroll,
    childRenderer,
    footerRenderer,
    dialogRenderer,
  } = props;

  const {
    displayMode,
    focus,
    path,
    theme,
    title,
    description,
    language,
    isApplePlatform,
  } = stateProps;

  const childProps = getChildProps(stateProps);

  const hasError = childProps.hasError;
  const hasNotification = childProps.hasNotification;
  const hasDialog = childProps.dialogContentType != null;

  const styles = createStyle(theme, applyStyles);

  return (
    <KeyboardAvoidingView
      behavior={isApplePlatform ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={isApplePlatform ? 50 : 20}>
      <Navigation
        displayMode={displayMode}
        theme={theme}
        language={language}
        hasBackButton={hasBackButton(path)}
        hasSettingsButton={hasSettingsButton(path)}
      />
      <View style={styles.layoutWrapper}>
        <Animated.ScrollView
          bounces={false}
          style={styles.layoutWrapper}
          nestedScrollEnabled={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          onScroll={onScroll}>
          <View style={styles.contentViewWrapper}>
            {hasHeader === false ? null : (
              <Header
                {...childProps}
                title={title}
                description={description}
                path={path}
                source={imageSource}
              />
            )}
            {childRenderer(childProps)}
            {displayMode === DisplayModes.landscape &&
              footerRenderer &&
              footerRenderer(childProps)}
          </View>
        </Animated.ScrollView>
      </View>
      {displayMode === DisplayModes.portrait &&
        focus == null &&
        footerRenderer &&
        footerRenderer(childProps)}

      {hasError === false && hasNotification && (
        <Notification {...childProps} />
      )}
      {hasError && <Error {...childProps} />}
      {hasDialog && dialogRenderer && dialogRenderer(childProps)}
    </KeyboardAvoidingView>
  );
};
