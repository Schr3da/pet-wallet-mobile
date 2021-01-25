import * as React from "react";

import {createStyleWithoutTheme} from "../../theme";
import {Layout, CardsContainer} from "../common";
import {AddPetBar} from "./add-pet-bar";
import {Box} from "./box";
import {HelpBar} from "./help-bar";

import {applyStyles} from "./index.style";
import {onShowPetDetails} from "../../store/actions/pets";
import {useDispatch} from "react-redux";

const handleCardPress = (dispatch: any, id: string) =>
  dispatch(onShowPetDetails(id));

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const styles = createStyleWithoutTheme(applyStyles());

  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        const {hasPets} = props;
        return (
          <React.Fragment>
            {hasPets === false ? (
              <Box {...props} />
            ) : (
              <CardsContainer
                {...props}
                onCardPress={(id, measures) => handleCardPress(dispatch, id)}
                onSharePress={(id, measures) =>
                  console.log("share press", id, measures)
                }
              />
            )}
          </React.Fragment>
        );
      }}
      footerRenderer={(props) => {
        const {hasPets} = props;
        return (
          <React.Fragment>
            {hasPets === false ? (
              <HelpBar {...props} />
            ) : (
              <AddPetBar {...props} style={styles} />
            )}
          </React.Fragment>
        );
      }}
    />
  );
};
