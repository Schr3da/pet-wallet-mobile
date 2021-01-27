import * as React from "react";

import {View, Text} from "react-native";
import {connect} from "react-redux";

import type {ICombinedReducerState} from "../../../store/reducers";

import {NotificationTypes, onSetNotificationType} from "../../../store/actions/layout";
import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

import {applyStyles} from "./index.style";

interface IProps extends ILayoutChildProps {
  type: NotificationTypes;
  onAutoDismiss: () => void;
}

const shouldAutoDismiss = (type: NotificationTypes): boolean => 
  type === NotificationTypes.savedData;


export class Container extends React.Component<IProps, unknown> {
  private timer: any = null;

  constructor(props: IProps, context: any) {
    super(props, context);
  }

  public componentDidMount() {
    if (shouldAutoDismiss(this.props.type) === false) {
      return;
    }

    this.timer = setTimeout(() => {
      this.props.onAutoDismiss();
    }, 5000);
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public render(): JSX.Element {
    const {language, type, theme, displayMode} = this.props;
    const {title, text} = language.notifications[type];

    const styles = createStyle(theme, applyStyles(displayMode));

    return (
      <View style={{...styles.container}}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
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

export const Notification = connect(mapStateToProps, mapDispatchToProps)(Container);
