import * as React from "react";

import {View, Image, ViewStyle} from "react-native";

import {ILanguage} from "../../../language";
import {createStyle, ThemeTypes} from "../../../theme";
import {IPetDto} from "../../../dto/pets";
import {Label, LabelTypes} from "./label";
import {ImageButton} from "../image-button";
import {measureComponent, IMeasureResult} from "../utils";

import {applyStyles} from "./index.style";

export type CardEventCallback = (
  id: string,
  measure: IMeasureResult | null,
) => void;

interface IProps {
  data: IPetDto;
  theme: ThemeTypes;
  language: ILanguage;
  style?: ViewStyle;
  onPress: CardEventCallback;
  onShare: CardEventCallback;
}

export const Card = (props: IProps) => {
  const ref = React.useRef(null);

  const {data, language, theme, onPress, onShare} = props;

  const hasProfileImage = data.profileImage != null;
  const hasProfileUrl = data.profileUri != null;
  const hasProfile = hasProfileImage || hasProfileUrl;

  const styles = createStyle(theme, applyStyles(hasProfile));

  return (
    <View ref={ref} style={{...styles.container, ...(props.style || {})}}>
      <Image
        style={styles.backgroundImage}
        source={
          theme === ThemeTypes.Dark
            ? require("../../../../assets/png/dark/card-background.png")
            : require("../../../../assets/png/light/card-background.png")
        }
      />
      <View style={styles.row}>
        <View style={{flexBasis: 58}}>
          <View style={styles.profileWrapper}>
            {hasProfile == null ? null : (
              <Image
                style={styles.image}
                source={{uri: data.profileUri! || data.profileImage!}}
              />
            )}
          </View>
        </View>
        <View style={styles.middleWrapper}>
          <Label
            theme={theme}
            type={LabelTypes.Large}
            title={`${language.card.nameProperty}: ${data.name}`}
            style={{marginBottom: 6}}
          />
          <Label
            theme={theme}
            type={LabelTypes.Small}
            title={`${language.card.animalProperty}: ${data.animal}`}
            style={{width: "80%"}}
          />
        </View>
        <View style={{flexBasis: 32}}>
          <ImageButton
            style={styles.buttonOverflow}
            imageStyle={styles.overflowIcon}
            source={
              theme === ThemeTypes.Dark
                ? require("../../../../assets/png/dark/overflow-button-icon.png")
                : require("../../../../assets/png/light/overflow-button-icon.png")
            }
            onPress={async () => {
              const measures = await measureComponent(ref);
              onPress(data.id, measures);
            }}
          />
          <ImageButton
            style={styles.buttonShare}
            imageStyle={styles.shareIcon}
            source={
              theme === ThemeTypes.Dark
                ? require("../../../../assets/png/dark/share-icon.png")
                : require("../../../../assets/png/light/share-icon.png")
            }
            onPress={async () => {
              const measures = await measureComponent(ref);
              onShare(data.id, measures);
            }}
          />
        </View>
      </View>
    </View>
  );
};
