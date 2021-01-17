import * as NewPet from "../../actions/new-pet";

export interface INewPetState {
  inputs: {[key in NewPet.InputIds]: NewPet.InputValues};
}

const initialState = (): INewPetState => ({
  inputs: {} as {[key in NewPet.InputIds]: NewPet.InputValues},
});

const handleInputChange = (
  state: INewPetState,
  id: string,
  value: string | number | null
) => ({
  ...state,
  inputs: {...state.inputs,
    [id]: value
  }
});

type Actions = NewPet.Actions;

const reducer = (
  state: INewPetState = initialState(),
  action: Actions 
) => {
  switch (action.type) {
    case NewPet.ON_INPUT_FIELD_CHANGE: 
      return handleInputChange(state, action.id, action.value);
    case NewPet.ON_CANCEL_NEW_PET:
      return initialState();
    default:
      return state;
  };
}

export const newPet = reducer;
