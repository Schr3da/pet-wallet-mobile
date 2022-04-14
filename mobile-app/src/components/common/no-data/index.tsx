import * as React from "react";
import {View, Image, Text, ViewStyle} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, ThemeTypes} from "../../../theme";
import {onSetErrorCode} from "../../../store/actions/layout";
import {ErrorTypes} from "../../../enums/layout";

import {applyStyles} from "./index.style";

interface IProps {
  image: any;
  title: string;
  theme: ThemeTypes;
  style?: ViewStyle;
  disableNotification?: boolean;
}

export const NoData = (props: IProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (props.disableNotification) {
      return;
    }
    dispatch(onSetErrorCode(ErrorTypes.noData));
  }, []);

  const {image, title, theme, style} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={{...styles.container, ...(style || {})}}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
