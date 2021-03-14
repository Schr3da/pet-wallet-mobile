import * as React from "react";

import {WebView} from "react-native-webview";
import {View, Text} from "react-native";

import {createStyle} from "../../theme";
import {Layout} from "../common";

import {applyStyles} from "./index.style";

export const Component = () => {
  return (
    <Layout
      imageSource={require("../../../assets/png/help-header-icon.png")}
      childRenderer={(props) => {
        const {theme, language} = props;
        const styles = createStyle(theme, applyStyles);
        return (
          <React.Fragment>
            <View style={styles.container}>
              <Text style={styles.paragraph}>
                {language.termsAndConditions.generalPart1}
              </Text>
              <Text style={styles.paragraph}>
                {language.termsAndConditions.generalPart2}
              </Text>
            </View>
          </React.Fragment>
        );
      }}
    />
  );
};
