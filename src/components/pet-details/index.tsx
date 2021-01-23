import * as React from "react";

import {View} from "react-native";
import {useSelector} from "react-redux";

import type {ICombinedReducerState} from "../../store/reducers";
import {createStyle} from "../../theme";
import {Card, Layout} from "../common";

import {applyStyles} from "./index.style";
import {getTranslation} from "../../language";

const stateToProps = (
  state: ICombinedReducerState,
) => ({
  selectedPet: (state.pets.data || []).find(
    (data) => state.pets.selectedId === data.id
  ), 
});

export const Component = (): JSX.Element =>  {

  const {selectedPet}= useSelector(stateToProps);

  return (
    <Layout
      hasHeader={false}
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {

        const {theme, language} = props;
        const styles = createStyle(theme, applyStyles);

        return (
          <React.Fragment>
            {selectedPet == null ? null : 
              <View style={styles.container}>
                <Card
                  data={selectedPet!} 
                  language={language}
                  theme={theme}
                  onPress={() => undefined}
                  onShare={() => undefined}
                />
              </View>
            }
          </React.Fragment>
        );
      }}  
    />
  );
};
