import {Layout} from "components/common";
import * as React from "react";

import {Text, View} from "react-native";

import {createStyle} from "../../theme";

import {applyStyles} from "./index.style";

export const Component = () => {
  return (
    <Layout
      title="Neues Haustier"
      description="Du kannst nun beginnen ein neues Haustier in deiner Pet Wallet anzulegen."
      imageSource={require("../../../assets/png/add-pet-icon.png")}
      render={(props) => {
        const {theme} = props;
        const styles = createStyle(theme, applyStyles); 

        return (
          <React.Fragment>
            <View style={styles.container as any}>
              <Text>New Pet View</Text>
            </View>
          </React.Fragment>
        );
      }}  
    />
  );
}
