import React from "react";

import {Image} from "react-native";

import type {ILayoutChildProps} from "../../common/layout";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImagePicker} from "../../common";

import {applyStyles} from "./index.style";

export const PassView = (props: ILayoutChildProps) => {

  const {theme} = props;
  const styles = createStyle(theme, applyStyles); 

  return (
    <React.Fragment>
      <Image
        style={styles.placeholderIcon}
        source={theme === ThemeTypes.Light ? 
          require("../../../../assets/png/light/new-pet-pass-icon.png") :
          require("../../../../assets/png/dark/new-pet-pass-icon.png")
        }
        />
      <ImagePicker 
        style={styles.picker}
        theme={theme}
      />
    </React.Fragment>
  );

}
