import type {IPetDto} from "../../../dto/pets";

import {NewPet, Pets, Database} from "../../actions";

export interface IPetsState {
  selectedId: string | null;
  data: IPetDto[];
}

const initialState = (): IPetsState => ({
  selectedId: null,
  data: [],
});

const saveNewPet = (state: IPetsState, data: IPetDto): IPetsState => ({
  ...state,
  data: [...state.data, data],
});

const setSelectedId = (state: IPetsState, id: string | null): IPetsState => ({
  ...state,
  selectedId: id,
});

type Actions = NewPet.Actions | Pets.Actions | Database.Actions;

const reducer = (state: IPetsState = initialState(), action: Actions) => {
  switch (action.type) {
    case Database.ON_REQUEST_DATA_DELETION:
      return initialState();
    case NewPet.ON_SAVE_NEW_PET:
      return saveNewPet(state, action.data);
    case Pets.ON_SHOW_PET_DETAILS:
      return setSelectedId(state, action.id);
    default:
      return state;
  }
};

export const pets = reducer;
