import React from "react";

import {Image, View} from "react-native";

import {createStyle} from "../../../theme";

import {ILayoutChildProps} from "../../common/layout";

import {AddPetBar} from "../add-pet-bar";

import {applyStyles} from './index.style';

export const Box = (props: {} & ILayoutChildProps): JSX.Element =>  {
  const {language, theme} = props;
  const styles = createStyle(theme, applyStyles); 

  return (
    <View style={styles.container as any}>
      <Image
        style={styles.image}
        source={require("../../../../assets/png/animals-illustration.png")}
      />
      <AddPetBar 
        theme={theme}
        language={language}
      />        
    </View>
  );
};
