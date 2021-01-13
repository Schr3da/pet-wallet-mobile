import * as React from "react";

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
      childRenderer={(props) => {
        const {theme} = props;
        const styles = createStyle(theme, applyStyles); 
        return (
          <React.Fragment>
            <InputField 
              id={InputIds.name}
              style={styles.inputField}
              placeholder="Name"
              theme={theme}
              value={stateProps.inputs[InputIds.name]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
            <InputField 
              id={InputIds.race}
              style={styles.inputField}
              placeholder="Race"
              theme={theme}
              value={stateProps.inputs[InputIds.race]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
            <InputField 
              id={InputIds.dateOfBirth}
              style={styles.inputField}
              placeholder="Date of birth"
              theme={theme}
              value={stateProps.inputs[InputIds.dateOfBirth]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
            <InputField 
              id={InputIds.age}
              style={styles.inputField}
              placeholder="Age"
              theme={theme}
              value={stateProps.inputs[InputIds.age]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
             <InputField 
              id={InputIds.age}
              style={styles.inputField}
              placeholder="Age"
              theme={theme}
              value={stateProps.inputs[InputIds.age]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
            <InputField 
              id={InputIds.age}
              style={styles.inputField}
              placeholder="Age"
              theme={theme}
              value={stateProps.inputs[InputIds.age]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
            <InputField 
              id={InputIds.age}
              style={styles.inputField}
              placeholder="Age"
              theme={theme}
              value={stateProps.inputs[InputIds.age]}
              onChange={(id, value) => handleInputChange(id, value, dispatch)}
            />
          </React.Fragment>
        );
      }}  
    />
  );
}