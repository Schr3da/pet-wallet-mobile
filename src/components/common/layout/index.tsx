import * as React from "react";

import {ImageSourcePropType, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";
import {SubViewComponents, ViewComponents} from "../../../store/actions/layout";
import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation, ILanguage, LanguageTypes} from "../../../language";
import {Header} from "../header";

import {applyStyles} from "./index.style";

interface IStateProps {
  title: string;
  description: string;
  theme: ThemeTypes,
  language: LanguageTypes;
  hasPets: boolean;
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  title: state.layout.title,
  description: state.layout.description,
  theme: state.layout.theme,  
  language: state.layout.language,
  mainViewComponent: state.layout.mainViewComponent,
  subViewComponent: state.layout.subViewComponent,
  hasPets: (state.pets.data || []).length !== 0, 
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
  language: ILanguage;
  hasPets: boolean;
  mainViewComponent: ViewComponents, 
  subViewComponent: SubViewComponents,
}

interface IProps {
  imageSource: ImageSourcePropType;
  render: (props: ILayoutChildProps) => React.ReactFragment;
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
    language,
  };
};

export const Layout = (props: IProps): JSX.Element =>  {
  const stateProps = useSelector(stateToProps);
  
  const {imageSource, render} = props;
  const {theme, title, description} = stateProps;

  const childProps = getChildProps(stateProps);
  const styles = createStyle(theme, applyStyles); 

  console.log("Layout", childProps);

  return (
    <View style={styles.container as any}>
      <Header
        {...childProps}
        title={title}
        description={description}
        source={imageSource}
      />
      {render(childProps)}  
    </View>
  );
};
