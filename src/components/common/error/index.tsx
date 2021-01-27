import * as React from "react";

import {View, Text} from "react-native";
import {connect} from "react-redux";

import type {ICombinedReducerState} from "../../../store/reducers";

import {ErrorTypes, onSetErrorCode} from "../../../store/actions/layout";
import {createStyle} from "../../../theme";
import {ILayoutChildProps} from "../layout";

import {applyStyles} from "./index.style";

interface IProps extends ILayoutChildProps {
  errorType: ErrorTypes | null;
  onAutoDismiss: () => void;
}

export class Container extends React.Component<IProps, unknown> {
  private timer: any = null;

  constructor(props: IProps, context: any) {
    super(props, context);
  }

  public componentDidMount() {
    this.timer = setTimeout(() => {
      this.props.onAutoDismiss();
    }, 5000);
  }

  public componentWillUnmount() {
    clearTimeout(this.timer);
  }

  public render(): JSX.Element {
    const {theme, displayMode} = this.props;

    const styles = createStyle(theme, applyStyles(displayMode));

    return (
      <View style={{...styles.container}}>
        <Text style={styles.title}>{this.getTitle()}</Text>
        <Text style={styles.text}>{this.getDescription()}</Text>
      </View>
    );
  }

  private getTitle = () => {
    const {language, errorType} = this.props;

    const defaultTitle = language.errors.default.title;

    if (errorType == null) {
      return defaultTitle;
    }

    let error = language.errors[errorType];
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

    let error = language.errors[errorType];
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