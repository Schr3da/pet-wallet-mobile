import * as React from "react";

import {Image, View} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";

interface IProps {
  theme: ThemeTypes;
}

export const Loader = (props: IProps) => {
  const {theme} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/png/icon-clean.png")}
        style={styles.appIcon}
      />
    </View>
  );
};
