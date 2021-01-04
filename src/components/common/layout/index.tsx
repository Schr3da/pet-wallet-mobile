import * as React from "react";

import {ImageSourcePropType, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";
import {createStyle, ThemeTypes} from "../../../theme";
import {getTranslation, ILanguage, LanguageTypes} from "../../../language";
import {Header} from "../header";

import {applyStyles} from "./index.style";

interface IStateProps {
  title: string;
  description: string;
  theme: ThemeTypes,
  language: LanguageTypes;
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  title: state.general.title,
  description: state.general.description,
  theme: state.general.theme,  
  language: state.general.language,
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
  language: ILanguage;
}

interface IProps {
  imageSource: ImageSourcePropType;
  render: (props: ILayoutChildProps) => React.ReactFragment;
}

const getChildProps = (
  props: IStateProps
) => {
  const language = getTranslation(props.language);
  return {
    theme: props.theme, 
    language,
  };
};

export const Layout = (props: IProps): JSX.Element =>  {
  const stateProps = useSelector(stateToProps);
  
  const {imageSource, render} = props;
  const {theme, title, description} = stateProps;
  
  const childProps = getChildProps(stateProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Header
        title={title}
        description={description}
        theme={theme}
        language={childProps.language}
        source={imageSource}
      />
      {render(childProps)}  
    </View>
  );
};
