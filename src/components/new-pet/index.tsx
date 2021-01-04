import * as React from "react";

import {Text, View} from "react-native";

import {createStyle} from "../../theme";

import {Layout} from "../common";

import {applyStyles} from "./index.style";

export const Component = () => {
  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-icon.png")}
      render={(props) => {
        const {theme} = props;
        const styles = createStyle(theme, applyStyles); 
        return (
          <React.Fragment>
            <View style={styles.container}>
              <Text>New Pet View</Text>
            </View>
          </React.Fragment>
        );
      }}  
    />
  );
}
