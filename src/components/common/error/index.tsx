import * as React from "react";

import {Text} from "react-native";
import {connect} from "react-redux";

import Animated from "react-native-reanimated";

import type {ICombinedReducerState} from "../../../store/reducers";

import {onSetErrorCode} from "../../../store/actions/layout";
import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

import {createNotificationAnimation} from "../utils";
import {applyStyles, containerAnimation} from "./index.style";
import {ErrorTypes} from "../../../enums/layout";

interface IProps extends ILayoutChildProps {
  errorType: ErrorTypes | null;
  onAutoDismiss: () => void;
}

export class Container extends React.Component<IProps, unknown> {
  private timer: any = null;

  private animation: Animated.BackwardCompatibleWrapper | null = null;

  private animatedValue = new Animated.Value(0);

  constructor(props: IProps, context: unknown) {
    super(props, context);
  }

  public componentDidMount() {
    this.startAnimation(1, () => {
      this.timer = setTimeout(() => {
        this.startAnimation(0, () => {
          this.props.onAutoDismiss();
        });
      }, 5000);
    });
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
    this.stopAnimation();
  }

  public render(): JSX.Element {
    const {theme, displayMode} = this.props;

    const styles = createStyle(theme, applyStyles(displayMode));
    const animation = containerAnimation(this.animatedValue);

    return (
      <Animated.View style={{...styles.container, ...animation}}>
        <Text style={styles.title}>{this.getTitle()}</Text>
        <Text style={styles.text}>{this.getDescription()}</Text>
      </Animated.View>
    );
  }

  private startAnimation = (toValue: number, onComplete: () => void) => {
    this.stopAnimation();
    this.animation = createNotificationAnimation(this.animatedValue, toValue);
    this.animation.start(() => {
      this.animation = null;
      onComplete();
    });
  };

  private stopAnimation = () => {
    if (this.animation == null) {
      return;
    }
    this.animation.stop();
  };

  private getTitle = () => {
    const {language, errorType} = this.props;

    const defaultTitle = language.errors.default.title;

    if (errorType == null) {
      return defaultTitle;
    }

    const error = language.errors[errorType];
    if (error == null || error.title == null) {
      return defaultTitle;
    }

    return error.title;
  };

  private getDescription() {
    const {language, errorType} = this.props;

    const defaultDescription = language.errors.default.text;

    if (errorType == null) {
      return defaultDescription;
    }

    const error = language.errors[errorType];
    if (error == null || error.text == null) {
      return defaultDescription;
    }

    return error.text;
  }
}

const mapStateToProps = (
  state: ICombinedReducerState,
  ownProps: ILayoutChildProps,
) => ({
  ...ownProps,
  errorType: state.layout.errorType,
});

const mapDispatchToProps = (dispatch: any) => ({
  onAutoDismiss: () => dispatch(onSetErrorCode(null)),
});

export const Error = connect(mapStateToProps, mapDispatchToProps)(Container);
