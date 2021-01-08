import * as React from "react";

import {Text, TouchableOpacity, View} from "react-native";

import {createStyleWithoutTheme} from "../../../theme";

import {applyStyles} from "./index.style";

export interface IProps {
  style: any;
  color: string;
  children?: any;
  title?: string;
  onPress: () => void;
}

export const StyledButton = (
  props: IProps
) => {
  const {children, color, style, title, onPress} = props;
  
  const styles = createStyleWithoutTheme(applyStyles(color));
  
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View style={style}>
          {title ? 
            <Text style={styles.text}>
              {title}
            </Text> : (children || [])
          } 
        </View>
      </TouchableOpacity>
    </View>
  );
}
