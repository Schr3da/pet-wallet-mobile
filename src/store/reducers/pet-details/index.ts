import {Navigation, PetDetails} from "../../actions";
import {ON_GO_BACK_NAVIGATION} from "../../actions/navigation";
import {
  ON_SET_PROFILE_IMAGE_PET_DETAILS,
  ON_FETCH_NOTES_PET_DETAILS,
} from "../../actions/pet-details";
import {IImageDataDto} from "../../../dto/image";
import {INotesDto} from "../../../dto/pets";

export interface IPetDetailsState {
  newProfile: IImageDataDto | null;
  notes: INotesDto[];
}

const initialState = (): IPetDetailsState => ({
  newProfile: null,
  notes: [],
});

const handleNewProfileImage = (
  state: IPetDetailsState,
  data: IImageDataDto,
): IPetDetailsState => {
  return {
    ...state,
    newProfile: data,
  };
};

const handleSetNotes = (state: IPetDetailsState, notes: INotesDto[]) => ({
  ...state,
  notes,
});

type Actions = Navigation.Actions | PetDetails.Actions;

const reducer = (state: IPetDetailsState = initialState(), action: Actions) => {
  switch (action.type) {
    case ON_GO_BACK_NAVIGATION:
      return initialState();
    case ON_SET_PROFILE_IMAGE_PET_DETAILS:
      return handleNewProfileImage(state, action.data);
    case ON_FETCH_NOTES_PET_DETAILS:
      return handleSetNotes(state, action.data);
    default:
      return state;
  }
};

export const petDetails = reducer;
