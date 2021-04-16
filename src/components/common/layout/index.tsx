import * as React from "react";

import {
  Animated,
  Dimensions,
  ImageSourcePropType,
  KeyboardAvoidingView,
  View,
} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";
import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation, ILanguage, LanguageTypes} from "../../../language";
import {Navigation} from "../navigation";
import {Header} from "../header";
import {Error} from "../error";
import {Notification} from "../notification";
import {IPickerData, PickerComponent} from "../picker";
import {Loader} from "../loader";
import {DatePickerComponent, DatePickerModes} from "../date-picker";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";

import {
  DisplayModes,
  ErrorTypes,
  NotificationTypes,
  DialogContentTypes,
  InputTypes,
} from "../../../enums/layout";

import {
  onChangeDisplayMode,
  getDisplayMode,
} from "../../../store/actions/layout";

import {applyStyles} from "./index.style";
import {InputValues} from "../../../enums/input";

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
  isPickerVisible: boolean;
  inputType: InputTypes | null | undefined;
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
  isPickerVisible: state.layout.isPickerVisible,
  inputType: state.layout.inputType,
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
  getPickerData?: (
    id: string | null,
    language: LanguageTypes,
    view: SubViewComponents,
  ) => IPickerData[];
  onPickerChanged?: (
    id: string | null,
    value: InputValues,
    view: SubViewComponents,
  ) => void;
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
    onPickerChanged,
    getPickerData,
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
    isPickerVisible,
    inputType,
    subViewComponent,
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
            {displayMode === DisplayModes.landscape && footerRenderer && (
              <View style={styles.footerPortraitModeWrapper}>
                {footerRenderer(childProps)}
              </View>
            )}
          </View>
        </Animated.ScrollView>
      </View>
      {displayMode === DisplayModes.portrait &&
        focus == null &&
        footerRenderer &&
        footerRenderer(childProps)}
      {isPickerVisible && inputType === InputTypes.date && (
        <DatePickerComponent
          id={focus}
          mode={DatePickerModes.date}
          theme={theme}
          locale={language}
          onComplete={(id: string | null, date: Date) =>
            onPickerChanged && onPickerChanged(id, date, subViewComponent)
          }
        />
      )}
      {isPickerVisible && inputType === InputTypes.picker && (
        <PickerComponent
          id={focus}
          data={
            (getPickerData &&
              getPickerData(focus, language, subViewComponent)) ||
            []
          }
          theme={theme}
          locale={language}
          isApplePlatform={isApplePlatform}
          onComplete={(id: string | null, value: string | null) =>
            onPickerChanged && onPickerChanged(id, value, subViewComponent)
          }
        />
      )}
      {hasError === false && hasNotification && (
        <Notification {...childProps} />
      )}
      {hasError && <Error {...childProps} />}
      {hasDialog && dialogRenderer && dialogRenderer(childProps)}
    </KeyboardAvoidingView>
  );
};
