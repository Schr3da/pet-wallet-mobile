import * as React from "react";

import type {ICombinedReducerState} from "../../store/reducers";

import {Card, Layout} from "../common";

import {useSelector} from "react-redux";

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
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        const {language, theme} = props;
        return (
          <React.Fragment>
            {selectedPet == null ? null : 
              <Card
                data={selectedPet!} 
                language={language}
                theme={theme}
                onPress={() => undefined}
                onShare={() => undefined}
              />
            }
          </React.Fragment>
        );
      }}
      footerRenderer={(props) => {
        return (
          <React.Fragment>
          </React.Fragment>
        );
      }}
    />
  );
};
