import * as React from "react";

import {ImageSourcePropType, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../../store/reducers";
import {createStyle, getColors, ITheme, ThemeTypes} from "../../../theme";
import {Header} from "../header";

import {applyStyles} from "./index.style";

interface IStateProps {
  theme: ThemeTypes,
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  theme: state.theme.current,  
});

export interface ILayoutChildProps {
  theme: ThemeTypes;
}

interface IProps {
  title: string;
  description: string;
  imageSource: ImageSourcePropType;
  render: (props: ILayoutChildProps) => React.ReactFragment;
}

export const Layout = (props: IProps): JSX.Element =>  {
  const {description, imageSource, render, title} = props;
  const {theme} = useSelector(stateToProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Header
        source={imageSource}
        title={title}
        description={description}
        theme={theme}
      />
      {render({theme})}  
    </View>
  );
};
