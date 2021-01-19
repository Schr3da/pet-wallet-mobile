import * as React from "react";

import {View, FlatList} from "react-native";
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
        <FlatList 
          style={styles.list}
          data={data} 
          keyExtractor={(_) => "1"}
          renderItem={(_) => {
            const entity = {
              id: "1",
              name: "Gino",
              dateOfBirth: "23/01/11",
              age: "8",
              profile: undefined,
              race: "Dog",
            };

            return (
              <Card data={entity} theme={theme}/>
            );
          }}
        />
      </View>
    );
  }
}

const mapStateToProps = (
  state: ICombinedReducerState, 
  ownProps: ILayoutChildProps
): IProps => ({
  data: [state.pets.data],
  ...ownProps
})

const mapDispatchToProps = {

}

export const CardsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);
