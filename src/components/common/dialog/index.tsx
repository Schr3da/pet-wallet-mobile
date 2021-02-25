import * as React from "react";

import Animated, {Easing} from "react-native-reanimated";

import {Text, View} from "react-native";
import {useDispatch} from "react-redux";

import * as RoundedButtons from "../rounded-button";

import {onDismissDialog} from "../../../store/actions/layout";
import {ThemeTypes, createStyle} from "../../../theme";
import {ILanguage} from "../../../language";

import {applyStyle, containerAnimation} from "./index.style";

interface IProps {
  language: ILanguage;
  theme: ThemeTypes;
  title: string;
  text: string;
  onPress: () => void;
}

const handleCancel = (dispatch: any) => dispatch(onDismissDialog());

const animate = async (
  currentValue: Animated.Value<number>,
  toValue: number,
  setIsAnimating: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<void> =>
  new Promise((resolve) => {
    setIsAnimating(true);
    Animated.timing(currentValue, {
      toValue,
      duration: 200,
      easing: Easing.linear,
    }).start(() => {
      setIsAnimating(false);
      resolve();
    });
  });

export const Dialog = (props: IProps) => {
  const dispatch = useDispatch();

  const [opacityValue] = React.useState(new Animated.Value(0));
  const [isAnimating, setIsAnimating] = React.useState(false);

  React.useEffect(() => {
    animate(opacityValue, 1, setIsAnimating);
  }, []);

  const {language, theme, title, text, onPress} = props;

  const styles = createStyle(theme, applyStyle);
  const animation = containerAnimation(opacityValue);

  return (
    <Animated.View style={[styles.container, animation]}>
      <View style={styles.contentWrapper}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.text}>{text}</Text>
        </View>
        <View style={styles.actionWrapper}>
          <RoundedButtons.SecondaryButton
            theme={theme}
            title={language.common.cancel}
            didPress={isAnimating}
            onPress={async () => {
              await animate(opacityValue, 0, setIsAnimating);
              handleCancel(dispatch);
            }}
          />
          <RoundedButtons.PrimaryButton
            theme={theme}
            title={language.common.continue}
            didPress={isAnimating}
            onPress={async () => {
              await animate(opacityValue, 0, setIsAnimating);
              onPress();
            }}
          />
        </View>
      </View>
    </Animated.View>
  );
};
