import * as React from "react";

import {Image, View} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {ILayoutChildProps} from "../../common/layout";
import {AddPetBar} from "../add-pet-bar";

import {applyStyles} from "./index.style";

export const Box = (props: ILayoutChildProps): JSX.Element => {
  const {theme} = props;
  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          theme === ThemeTypes.Light
            ? require("../../../../assets/png/light/animals-illustration.png")
            : require("../../../../assets/png/dark/animals-illustration.png")
        }
      />
      <AddPetBar {...props} />
    </View>
  );
};
