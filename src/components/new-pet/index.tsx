import * as React from "react";

import {Text, View} from "react-native";
import {useSelector} from "react-redux";

import {ICombinedReducerState} from "../../store/reducers";
import {createStyle} from "../../theme";

import {applyStyles} from "./index.style";

const stateToProps = (
  state: ICombinedReducerState
) => ({
  theme: state.theme.current,
});

export const Component = () => {
  const {theme} = useSelector(stateToProps);
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Text>New Pet View</Text>
    </View>
  );
}
