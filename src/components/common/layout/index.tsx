import * as React from "react";

import {ImageSourcePropType, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";
import {createStyle, ThemeTypes} from "../../../theme";
import {getLanguageProperties, ILanguage, LanguageTypes} from "../../../language";
import {Header} from "../header";

import {applyStyles} from "./index.style";

interface IStateProps {
  theme: ThemeTypes,
  language: LanguageTypes;
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  theme: state.theme.current,  
  language: state.general.currentLanguage,
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
  language: ILanguage;
}

interface IProps {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  render: (props: ILayoutChildProps) => React.ReactFragment;
}

const getChildProps = (
  props: IStateProps
) => {
  const language = getLanguageProperties(props.language);
  return {
    theme: props.theme, 
    language,
  };
};

export const Layout = (props: IProps): JSX.Element =>  {
  const {description, imageSource, render, title} = props;
  const stateProps = useSelector(stateToProps);

  const {theme} = stateProps;

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
