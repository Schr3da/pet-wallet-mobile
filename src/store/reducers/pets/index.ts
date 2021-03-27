import type {IPetDto} from "../../../dto/pets";

import {NewPet, Pets, Database, Navigation} from "../../actions";

export interface IPetsState {
  selectedId: string | null;
  data: IPetDto[];
}

const initialState = (): IPetsState => ({
  selectedId: null,
  data: [],
});

const setPets = (state: IPetsState, data: IPetDto[]): IPetsState => ({
  ...state,
  data: [...(data || [])],
});

const setSelectedId = (state: IPetsState, id: string | null): IPetsState => ({
  ...state,
  selectedId: id,
});

type Actions =
  | NewPet.Actions
  | Pets.Actions
  | Database.Actions
  | Navigation.Actions;

const reducer = (state: IPetsState = initialState(), action: Actions) => {
  switch (action.type) {
    case Pets.ON_SET_PETS:
      return setPets(state, action.data);
    case Navigation.ON_SHOW_PET_DETAILS:
      return setSelectedId(state, action.id);
    case Database.ON_REQUEST_DATA_DELETION:
      return initialState();
    default:
      return state;
  }
};

export const pets = reducer;
