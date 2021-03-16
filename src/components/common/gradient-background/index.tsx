import * as React from "react";

import {View, Image} from "react-native";
import {ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";
import {DisplayModes} from "../../../enums/layout";

export interface IProps {
  theme: ThemeTypes;
  mode: DisplayModes;
}

export const GradientBackground = (props: IProps) => {
  const {theme, mode} = props;

  const styles = applyStyles(mode);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          theme === ThemeTypes.Dark
            ? require("../../../../assets/png/dark/gradient.png")
            : require("../../../../assets/png/light/gradient.png")
        }
      />
    </View>
  );
};
