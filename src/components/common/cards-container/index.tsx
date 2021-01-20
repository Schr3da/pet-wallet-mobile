import * as React from "react";

import {View, ScrollView} from "react-native";
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

class Container extends React.Component<IProps, {}> {

  constructor(props: IProps, context: any) {
    super(props, context);
  }

  public render() {
    const {data, language, theme, onCardPress, onSharePress} = this.props;

    const styles = createStyle(theme, applyStyles);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.list}
          bounces={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data.map((animal, index) => {
            return (
              <Card
                key={index}
                data={animal} 
                language={language}
                theme={theme}
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
  ownProps: ILayoutChildProps & Pick<IProps, "onCardPress" | "onSharePress"> 
): IProps => ({
  data: state.pets.data,
  ...ownProps
})

const mapDispatchToProps = (
  _: any
) => ({});

export const CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
