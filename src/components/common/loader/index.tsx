import * as React from "react";

import {Image, View} from "react-native";

import {createStyle, getColors, ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";

interface IProps {
  theme: ThemeTypes;
  isAnimating: boolean;
}

export const Loader = (props: IProps) => {
  const {theme} = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <View style={styles.page(colors.color4, 1)}/>
        <View style={styles.page(colors.color5, 5)}/>
        <View style={styles.page(colors.color14, 9)}/>
        <Image
          source={require("../../../../assets/png/loader-footer.png")}
          style={styles.footer}
        />
      </View>
    </View>
  );
};
