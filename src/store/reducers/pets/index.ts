import type {IPetDto} from "../../../dto/pets";

export interface IPetsState {
  data: IPetDto[];
}

const initialState = (): IPetsState => ({
  data: [],
});

const reducer = (
  state: IPetsState = initialState(),
  action: any
) => {
  switch (action.type) {
    default:
      return state;
  }
}

export const pets = reducer;
