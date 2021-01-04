export interface IPetsState {
  data: any[];
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
