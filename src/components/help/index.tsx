import * as React from "react";

import {Text, View} from "react-native";

import {createStyle} from "../../theme";

import {Layout} from "../common/layout";

import {applyStyles} from "./index.style";

export const Component = () => {
  return (
    <Layout
      imageSource={require("../../../assets/png/help-icon.png")}
      render={(props) => {
        const {theme} = props;
        const styles = createStyle(theme, applyStyles); 
        return (
          <React.Fragment>
            <View style={styles.container as any}>
              <Text>Hilfe View</Text>
            </View>
          </React.Fragment>
        );
      }}  
    />
  );
};
