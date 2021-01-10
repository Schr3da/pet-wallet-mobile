import * as React from "react";

import {View} from "react-native";

import {useDispatch, useSelector} from "react-redux";

import {createStyle} from "../../theme";

import {Layout, InputField} from "../common";

import {InputValues, onInputFieldChange, InputIds} from "../../store/actions/new-pet";

import {ICombinedReducerState} from "../../store/reducers";

import {applyStyles} from "./index.style";

interface IStateProps {
  inputs: {[key in InputIds]: InputValues};
}

const stateToProps = (
  state: ICombinedReducerState
): IStateProps => ({
  inputs: state.newPet.inputs,
});

const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => dispatch(onInputFieldChange(id, value)) ;

export const Component = () => {

  const stateProps = useSelector(stateToProps);
  
  const dispatch = useDispatch();

  return (
    <Layout
      imageSource={require("../../../assets/png/add-pet-header-icon.png")}
      render={(props) => {
        const {theme} = props;
        const styles = createStyle(theme, applyStyles); 
        return (
          <React.Fragment>
            <View style={styles.container}>
              <InputField 
                id={InputIds.sample}
                theme={theme}
                value={stateProps.inputs[InputIds.sample]}
                onChange={(id, value) => handleInputChange(id, value, dispatch)}
              />
            </View>
          </React.Fragment>
        );
      }}  
    />
  );
}
