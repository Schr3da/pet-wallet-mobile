import type {IPetDto} from "../../../dto/pets";

import {NewPet} from "../../actions";

export interface IPetsState {
  data: IPetDto[];
}

const initialState = (): IPetsState => ({
  data: [],
});

const saveNewPet = (
  state: IPetsState,
  data: IPetDto,
): IPetsState => ({
  ...state,
  data: [...state.data, data],
});

type Actions = NewPet.Actions;

const reducer = (
  state: IPetsState = initialState(),
  action: Actions, 
) => {
  switch (action.type) {
    case NewPet.ON_SAVE_NEW_PET:
      return saveNewPet(state, action.data);
    default:
      return state;
  }
}

export const pets = reducer;
