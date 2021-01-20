import * as React from "react";

import {View, Text, Image} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";

import {applyStyles} from "./index.style";
import {Label, LabelTypes} from "./label";
import {StyledButton} from "../styled-button";
import {ImageButton} from "../image-button";

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
        source={theme === ThemeTypes.Dark ?
          require("../../../../assets/png/dark/card-background.png") :
          require("../../../../assets/png/light/card-background.png")
        }
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
            title={"Name: " + data.name}
            style={{marginBottom: 6}}
          />
          <Label 
            theme={theme}
            type={LabelTypes.Small}
            title={"Animal: " + data.race}
            style={{width: "80%"}}
          />
        </View>
        <View style={{flexBasis: 32}}>
          <ImageButton
            style={styles.buttonOverflow} 
            imageStyle={styles.overflowIcon}
            source={theme === ThemeTypes.Dark ?
              require("../../../../assets/png/dark/overflow-button-icon.png") :
              require("../../../../assets/png/light/overflow-button-icon.png")
            }
            onPress={() => undefined}
          />
          <ImageButton
            style={styles.buttonShare} 
            imageStyle={styles.shareIcon}
            source={theme === ThemeTypes.Dark ?
              require("../../../../assets/png/dark/share-icon.png") :
              require("../../../../assets/png/light/share-icon.png")
            }
            onPress={() => undefined}
          />
        </View>
      </View>
    </View>
  )
};
