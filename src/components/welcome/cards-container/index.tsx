import * as React from "react";

import {View, ScrollView} from "react-native";
import {connect} from "react-redux";

import type {ILayoutChildProps} from "../../common/layout";
import type {IPetDto} from "../../../dto/pets";

import {createStyle} from "../../../theme";
import {ICombinedReducerState} from "../../../store/reducers";
import {Card} from "../../common";

import {applyStyles} from "./index.style";

interface IProps extends ILayoutChildProps {
  data: IPetDto[];
}

class Container extends React.Component<IProps, {}> {
  
  constructor(props: IProps, context: any) {
    super(props, context);
  }

  public render() {
    const {data, theme} = this.props;

    const styles = createStyle(theme, applyStyles);

    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.list}
          bounces={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        >
          {data.map((_, index) => {
            const entity = {
              id: "1",
              name: "Gino",
              dateOfBirth: "23/01/11",
              age: "8",
              profile: undefined,
              race: "Dog",
            };

            return (
              <Card 
                key={index}
                data={entity} 
                theme={theme}
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
  ownProps: ILayoutChildProps
): IProps => ({
  data: [1],
  ...ownProps
})

const mapDispatchToProps = {

}

export const CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
