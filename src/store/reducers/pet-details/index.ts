import {Navigation, PetDetails} from "../../actions";
import {
  ON_GO_BACK_NAVIGATION,
  ON_SHOW_HOME_COMPONENT,
} from "../../actions/navigation";
import {IImageDataDto} from "../../../dto/image";
import {INotesDto, IScanDto} from "../../../dto/pets";

import {
  ON_SET_PROFILE_IMAGE_PET_DETAILS,
  ON_FETCH_NOTES_PET_DETAILS,
  ON_FETCH_SCAN_RESULTS_PET_DETAILS,
} from "../../actions/pet-details";

export interface IPetDetailsState {
  newProfile: IImageDataDto | null;
  notes: INotesDto[];
  scans: IScanDto[];
}

const initialState = (): IPetDetailsState => ({
  newProfile: null,
  notes: [],
  scans: [],
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

const handleSetNotes = (
  state: IPetDetailsState,
  notes: INotesDto[],
): IPetDetailsState => ({
  ...state,
  notes,
});

const handleSetScans = (
  state: IPetDetailsState,
  scans: IScanDto[],
): IPetDetailsState => ({
  ...state,
  scans,
});

type Actions = Navigation.Actions | PetDetails.Actions;

const reducer = (state: IPetDetailsState = initialState(), action: Actions) => {
  switch (action.type) {
    case ON_SHOW_HOME_COMPONENT:
      return initialState();
    case ON_SET_PROFILE_IMAGE_PET_DETAILS:
      return handleNewProfileImage(state, action.data);
    case ON_FETCH_NOTES_PET_DETAILS:
      return handleSetNotes(state, action.data);
    case ON_FETCH_SCAN_RESULTS_PET_DETAILS:
      return handleSetScans(state, action.data);
    default:
      return state;
  }
};

export const petDetails = reducer;
