import * as React from "react";

import {Text, TouchableHighlight, View} from "react-native";

import {createStyleWithoutTheme} from "theme";

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
    <View style={styles.container as any}>
      <TouchableHighlight onPress={onPress}>
        <View style={style}>
          {title ? 
            <Text style={styles.text as any}>
              {title}
            </Text> : (children || [])
          } 
        </View>
      </TouchableHighlight>
    </View>
  );
}
