import * as React from "react";

import {
  View,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import {connect} from "react-redux";

import type {ILayoutChildProps} from "../layout";
import type {IPetDto} from "../../../dto/pets";

import {createStyle} from "../../../theme";
import {ICombinedReducerState} from "../../../store/reducers";
import {Card, CardEventCallback} from "../card";

import {applyStyles} from "./index.style";

interface IProps extends ILayoutChildProps {
  data: IPetDto[];
  onCardPress: CardEventCallback;
  onSharePress: CardEventCallback;
}

interface IState {}

class Container extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);

    this.state = {};
  }

  private handleScrollStart = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    event.preventDefault();
  };

  private handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    event.preventDefault();
  };

  private handleScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    event.preventDefault();
  };

  public render() {
    const {data, language, theme, onCardPress, onSharePress} = this.props;

    const styles = createStyle(theme, applyStyles(data.length));

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.list}
          bounces={false}
          showsHorizontalScrollIndicator={true}
          showsVerticalScrollIndicator={true}
          scrollEventThrottle={40}
          onScroll={this.handleScroll}
          onScrollBeginDrag={this.handleScrollStart}
          onScrollEndDrag={this.handleScrollEnd}>
          {data.map((animal, index) => {
            return (
              <Card
                key={index}
                data={animal}
                language={language}
                theme={theme}
                style={styles.card}
                onPress={onCardPress}
                onShare={onSharePress}
              />
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (
  state: ICombinedReducerState,
  ownProps: ILayoutChildProps & Pick<IProps, "onCardPress" | "onSharePress">,
): IProps => ({
  data: state.pets.data,
  ...ownProps,
});

const mapDispatchToProps = (_: any) => ({});

export const CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Container);
