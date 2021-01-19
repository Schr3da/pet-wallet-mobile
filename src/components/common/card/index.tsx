import * as React from "react";

import {View, Text, Image} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";
import {Label, LabelTypes} from "./label";

interface IProps {
  theme: ThemeTypes;
  data: {
    id: string;
    name: string;
    dateOfBirth: string;
    age: string;
    profile: string | undefined;
    race: string;
  },
}

export const Card = (
  props: IProps
) => {
  const {data, theme} = props;

  const hasProfile = data.profile != null;
  const styles = createStyle(theme, applyStyles(hasProfile));

  return (
    <View style={styles.container}>
      <Image
        style={styles.backgroundImage} 
        source={require("../../../../assets/png/card-background.png")}
      />
      <View style={styles.row}>
        <View style={{flexBasis: 58}}>
          <View style={styles.profileWrapper}>
            <Image
              style={styles.image} 
              source={{uri: data.profile}}
            />
          </View>
        </View>
        <View style={styles.middleWrapper}>
          <Label 
            theme={theme}
            type={LabelTypes.Large}
            title={data.name}
            style={{marginBottom: 6}}
          />
          <Label 
            theme={theme}
            type={LabelTypes.Small}
            title={data.race}
            style={{width: "80%"}}
          />
        </View>
        <View style={{flexBasis: 30}}>
        </View>
      </View>
    </View>
  )
};
