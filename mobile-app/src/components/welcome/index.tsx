import * as React from "react";

import {Animated, View} from "react-native";
import {useDispatch, useSelector} from "react-redux";

import {onSharePet} from "../../store/actions/pets";
import {ICombinedReducerState} from "../../store/reducers";
import {createStyle} from "../../theme";
import {Layout, Card} from "../common";
import {AddPetBar} from "./add-pet-bar";
import {Box} from "./box";
import {onShowPetDetails} from "../../store/actions/pet-details";

import {animatedCardStyle, applyStyles} from "./index.style";

const stateToProps = (state: ICombinedReducerState): any => ({
  pets: state.pets.data,
});

const handleCardPress = (dispatch: any, id: string) =>
  dispatch(onShowPetDetails(id));

const handleShare = async (dispatch: any, id: string) =>
  dispatch(onSharePet(id));

const animation = new Animated.Value(0);

const handleScroll = Animated.event(
  [
    {
      nativeEvent: {
        contentOffset: {
          y: animation,
        },
      },
    },
  ],
  {useNativeDriver: true},
);

export const Component = (): JSX.Element => {
  const dispatch = useDispatch();

  const stateProps = useSelector(stateToProps);
  const {pets} = stateProps;

  return (
    <Layout
      imageSource={require("../../../assets/png/welcome-header-icon.png")}
      onScroll={handleScroll}
      childRenderer={(props) => {
        const {hasPets, language, theme} = props;

        return (
          <React.Fragment>
            {hasPets === false ? (
              <Box {...props} />
            ) : (
              pets.map((animal: any, index: number) => {
                const animitedStyles = animatedCardStyle(
                  index,
                  pets.length,
                  animation,
                );
                return (
                  <Animated.View key={index} style={animitedStyles}>
                    <Card
                      data={animal}
                      language={language}
                      theme={theme}
                      onPress={(id: string) => handleCardPress(dispatch, id)}
                      onShare={async (id: string) =>
                        await handleShare(dispatch, id)
                      }
                    />
                  </Animated.View>
                );
              })
            )}
          </React.Fragment>
        );
      }}
      footerRenderer={(props) => {
        const {hasPets, theme} = props;

        const styles = createStyle(theme, applyStyles);

        return (
          <View style={styles.footer}>
            {hasPets === false ? null : (
              <AddPetBar {...props} style={styles.addPetBar} />
            )}
          </View>
        );
      }}
    />
  );
};
