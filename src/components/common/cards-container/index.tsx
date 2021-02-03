import * as React from "react";

import {View, Animated} from "react-native";
import {connect} from "react-redux";

import type {ILayoutChildProps} from "../layout";
import type {IPetDto} from "../../../dto/pets";

import {createStyle} from "../../../theme";
import {ICombinedReducerState} from "../../../store/reducers";
import {Card, CardEventCallback} from "../card";

import {applyStyles, animatedCardStyle} from "./index.style";

interface IProps extends ILayoutChildProps {
  data: IPetDto[];
  onCardPress: CardEventCallback;
  onSharePress: CardEventCallback;
}

interface IState {}

class Container extends React.Component<IProps, IState> {
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  private animation = new Animated.Value(0);

  private handleScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: this.animation,
          },
        },
      },
    ],
    {useNativeDriver: true},
  );

  public render() {
    const {data, language, theme, onCardPress, onSharePress} = this.props;

    const styles = createStyle(theme, applyStyles(data.length));

    return (
      <View style={styles.container}>
        <Animated.ScrollView
          style={styles.list}
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={this.handleScroll}>
          {data.map((animal, index) => {
            const animitedStyles = animatedCardStyle(
              index,
              data.length,
              this.animation,
            );

            return (
              <Animated.View key={index} style={animitedStyles}>
                <Card
                  data={animal}
                  language={language}
                  theme={theme}
                  onPress={onCardPress}
                  onShare={onSharePress}
                />
              </Animated.View>
            );
          })}
        </Animated.ScrollView>
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
