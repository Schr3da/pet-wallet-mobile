import {Navigation, PetDetails, ScanResult} from "../../actions";
import {
  ON_SHOW_HOME_COMPONENT,
  ON_GO_BACK_NAVIGATION,
} from "../../actions/navigation";
import {IImageDataDto} from "../../../dto/image";
import {INotesDto, IScanDto} from "../../../dto/pets";
import {ON_NEW_PET_PASS_SCAN_RESULT} from "../../actions/scan-result";
import {IScanResult} from "../../../dto/scan";

import {
  ON_SET_PROFILE_IMAGE_PET_DETAILS,
  ON_FETCH_NOTES_PET_DETAILS,
  ON_FETCH_SCAN_RESULTS_PET_DETAILS,
} from "../../actions/pet-details";

export interface IPetDetailsState {
  newProfile: IImageDataDto | null;
  notes: INotesDto[];
  scans: IScanDto[];
  newScan: IScanResult | null;
}

const initialState = (): IPetDetailsState => ({
  newProfile: null,
  notes: [],
  scans: [],
  newScan: null,
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

const handleNewScanResult = (
  state: IPetDetailsState,
  newScan: IScanResult,
): IPetDetailsState => ({
  ...state,
  newScan,
});

type Actions = Navigation.Actions | PetDetails.Actions | ScanResult.Actions;

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
    case ON_NEW_PET_PASS_SCAN_RESULT:
      return handleNewScanResult(state, action.data);
    default:
      return state;
  }
};

export const petDetails = reducer;
