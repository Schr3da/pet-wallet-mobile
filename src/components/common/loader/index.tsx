import * as React from "react";

import {Image, View} from "react-native";
import Animated, { Easing } from "react-native-reanimated";

import {createStyle, getColors, ThemeTypes} from "../../../theme";

import {applyStyles, applyPageStyles} from "./index.style";

interface IPageProps {
  isAnimating: boolean;
  color: string;
  time: number;
  start: number;
  end: number;
}

class Page extends React.Component<IPageProps, any> {

  private animationValue: Animated.Value<number>;
  
  private animation: Animated.BackwardCompatibleWrapper | null;

  private willUnmount: boolean;

  constructor(props: IPageProps, context: any) {
    super(props, context);

    this.willUnmount = false;
    this.animation = null;
    this.animationValue = new Animated.Value(props.start);
  }

  public componentDidMount() {
    this.animate();
  }

  public componentWillUnmount() {
    this.willUnmount = true;
    if (this.animation == null) {
      return; 
    }
    this.animation.stop();
    this.animation = null;
  }

  public render() {
    const {color} = this.props;
    const animatedStyle = applyPageStyles(color, this.animationValue);

    return (
      <Animated.View style={animatedStyle}/>
    );
  }

  private animateToStart() {
    return new Promise((resolve) => {
      const {start} = this.props;
      this.animation = this.toTarget(start);
      this.animation.start(resolve);
    })
  }

  private animateToEnd() {
    return new Promise((resolve) => {
      const {end} = this.props;
      this.animation = this.toTarget(end);
      this.animation.start(resolve);
    });
  }

  private toTarget(toValue: number) {
    return Animated.timing(this.animationValue, {
      toValue,
      duration: this.props.time,
      easing: Easing.cubic,
    });
  }  

  private async animate() {
    if (this.willUnmount === true) {
      return;
    }

    if (this.props.isAnimating === false) {
      return;
    }

    await this.animateToEnd(); 
    await this.animateToStart();
    this.animate();
  }
}

interface IProps {
  theme: ThemeTypes;
  isAnimating: boolean;
}

export const Loader = (props: IProps) => {
  const {isAnimating, theme} = props;

  const styles = createStyle(theme, applyStyles);
  const colors = getColors(theme);
  const endValue = 30;

  return (
    <View style={styles.container}>
      <View style={styles.loader}>
        <Page 
          color={colors.color4} 
          isAnimating={isAnimating}
          time={1000}
          start={1} 
          end={endValue}
        />
        <Page 
          color={colors.color5} 
          isAnimating={isAnimating}
          time={850}
          start={4} 
          end={endValue}
        />
        <Page 
          color={colors.color14} 
          isAnimating={isAnimating}
          time={700}
          start={9} 
          end={endValue}
        />
        <Image
          source={require("../../../../assets/png/loader-footer.png")}
          style={styles.footer}
        />
      </View>
    </View>
  );
};