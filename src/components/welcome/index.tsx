import * as React from "react";

import {View} from "react-native";
import {useDispatch} from "react-redux";

import {createStyle, createStyleWithoutTheme} from "../../theme";
import {Layout, CardsContainer} from "../common";
import {AddPetBar} from "./add-pet-bar";
import {Box} from "./box";
import {HelpBar} from "./help-bar";

import {applyStyles} from "./index.style";
import {onShowPetDetails} from "../../store/actions/pets";

const handleCardPress = (dispatch: any, id: string) =>
  dispatch(onShowPetDetails(id));

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      childRenderer={(props) => {
        const {hasPets, theme} = props;

        const styles = createStyle(theme, applyStyles);

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
        const {hasPets, theme} = props;

        const styles = createStyle(theme, applyStyles);

        return (
          <View style={styles.footer}>
            {hasPets === false ? (
              <HelpBar {...props} />
            ) : (
              <AddPetBar {...props} style={styles.addPetBar} />
            )}
          </View>
        );
      }}
    />
  );
};
