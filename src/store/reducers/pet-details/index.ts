import {Navigation} from "../../actions";
import {ON_GO_BACK_NAVIGATION} from "../../actions/navigation";

export interface IPetDetailsState {}

const initialState = (): IPetDetailsState => ({});

const cancelEdit = (state: IPetDetailsState) => ({
  ...state,
});

type Actions = Navigation.Actions;

const reducer = (state: IPetDetailsState = initialState(), action: Actions) => {
  switch (action.type) {
    case ON_GO_BACK_NAVIGATION:
      return cancelEdit(state);
    default:
      return state;
  }
};

export const petDetails = reducer;
