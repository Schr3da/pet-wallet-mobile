import {
  ON_TOGGLE_PET_DETAILS_MODE,
  ON_CANCEL_PET_DETAILS_EDIT,
} from "../../actions/pet-details";
import {PetDetails, Navigation} from "../../actions";
import {ON_GO_BACK_NAVIGATION} from "../../actions/navigation";

export interface IPetDetailsState {
  isEditMode: boolean;
}

const initialState = (): IPetDetailsState => ({
  isEditMode: false,
});

const toggleMode = (state: IPetDetailsState) => ({
  ...state,
  isEditMode: !state.isEditMode,
});

const cancelEdit = (state: IPetDetailsState) => ({
  ...state,
  isEditMode: false,
});

type Actions = PetDetails.Actions | Navigation.Actions;

const reducer = (state: IPetDetailsState = initialState(), action: Actions) => {
  switch (action.type) {
    case ON_TOGGLE_PET_DETAILS_MODE:
      return toggleMode(state);
    case ON_CANCEL_PET_DETAILS_EDIT:
      return cancelEdit(state);
    case ON_GO_BACK_NAVIGATION:
      return cancelEdit(state);
    default:
      return state;
  }
};

export const petDetails = reducer;
