import * as React from "react";

import {Text} from "react-native";
import {connect} from "react-redux";
import Animated from "react-native-reanimated";

import type {ICombinedReducerState} from "../../../store/reducers";
import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

import {onSetNotificationType} from "../../../store/actions/layout";

import {createNotificationAnimation} from "../utils";
import {applyStyles, containerAnimation} from "./index.style";
import {NotificationTypes} from "../../../enums/layout";

interface IProps extends ILayoutChildProps {
  type: NotificationTypes;
  onAutoDismiss: () => void;
}

const shouldAutoDismiss = (type: NotificationTypes): boolean =>
  type === NotificationTypes.savedData;

export class Container extends React.Component<IProps, unknown> {
  private timer: any = null;

  private animation: Animated.BackwardCompatibleWrapper | null = null;

  private animatedValue = new Animated.Value(0);

  constructor(props: IProps, context: any) {
    super(props, context);
  }

  public componentDidMount() {
    if (shouldAutoDismiss(this.props.type) === false) {
      return;
    }

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
  }

  public render(): JSX.Element {
    const {language, type, theme, displayMode} = this.props;
    const {title, text} = language.notifications[type];

    const styles = createStyle(theme, applyStyles(displayMode));
    const animation = containerAnimation(this.animatedValue);

    return (
      <Animated.View style={{...styles.container, ...animation}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
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
}

const mapStateToProps = (
  state: ICombinedReducerState,
  ownProps: ILayoutChildProps,
) => ({
  ...ownProps,
  type: state.layout.notificationType!,
});

const mapDispatchToProps = (dispatch: any) => ({
  onAutoDismiss: () => dispatch(onSetNotificationType(null)),
});

export const Notification = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
