import * as React from "react";

import {Image, ImageSourcePropType, ImageStyle, ViewStyle} from "react-native";

import {createStyleWithoutTheme} from "../../../theme";
import {StyledButton} from "../styled-button";

import {applyStyles} from "./index.style";

export interface IProps {
  style: ViewStyle;
  imageStyle?: ImageStyle;
  source: ImageSourcePropType;
  onPress: () => void;
}

export const ImageButton = (props: IProps) => {
  const {imageStyle, source, style, onPress} = props;

  const styles = createStyleWithoutTheme(applyStyles());

  return (
    <StyledButton style={style} color="transparent" onPress={onPress}>
      <Image style={{...styles.image, ...(imageStyle || {})}} source={source} />
    </StyledButton>
  );
};
