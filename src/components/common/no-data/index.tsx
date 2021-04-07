import * as React from "react";
import {View, Image, Text} from "react-native";

import {applyStyles} from "./index.style";
import {createStyle, ThemeTypes} from "../../../theme";
import {useDispatch} from "react-redux";
import {onSetErrorCode} from "../../../store/actions/layout";
import {ErrorTypes} from "../../../enums/layout";

interface IProps {
  image: any;
  title: string;
  theme: ThemeTypes;
}

export const NoData = (props: IProps) => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(onSetErrorCode(ErrorTypes.noData));
  }, []);

  const {image, title, theme} = props;

  const styles = createStyle(theme, applyStyles);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={image} />
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};
