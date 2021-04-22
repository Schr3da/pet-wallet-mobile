import {Navigation, PetDetails, ScanResult} from "../../actions";
import {ON_SHOW_HOME_COMPONENT} from "../../actions/navigation";
import {IImageDataDto} from "../../../dto/image";
import {INotesDto, IScanDto} from "../../../dto/pets";
import {ON_NEW_PET_PASS_SCAN_RESULT} from "../../actions/scan-result";
import {IScanResult} from "../../../dto/scan";

import {
  ON_SET_PROFILE_IMAGE_PET_DETAILS,
  ON_FETCH_NOTES_PET_DETAILS,
  ON_FETCH_SCAN_RESULTS_PET_DETAILS,
  ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS,
  ON_REMOVE_MEDICINE_INFO_PET_DETAILS,
  ON_CANCEL_PET_DETAILS_EDIT,
} from "../../actions/pet-details";

export interface IPetDetailsState {
  newProfile: IImageDataDto | null;
  notes: INotesDto[];
  scans: IScanDto[];
  editScans: IScanDto[];
  newScan: IScanResult | null;
  selectedMedicineInfoId: string | null;
}

const initialState = (): IPetDetailsState => ({
  newProfile: null,
  notes: [],
  scans: [],
  editScans: [],
  newScan: null,
  selectedMedicineInfoId: null,
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
  scans: scans.map((s) => ({...s})),
  editScans: scans.map((s) => ({...s})),
});

const handleNewScanResult = (
  state: IPetDetailsState,
  newScan: IScanResult,
): IPetDetailsState => ({
  ...state,
  newScan,
});

const handleSelectMedicineInfoId = (
  state: IPetDetailsState,
  id: string | null,
) => ({
  ...state,
  selectedMedicineInfoId: id,
});

const handleCancelEdit = (state: IPetDetailsState): IPetDetailsState => ({
  ...state,
  editScans: state.scans.map((s) => ({...s})),
});

const handleRemoveMedicineInfo = (state: IPetDetailsState, id?: string) => ({
  ...state,
  selectedMedicineInfoId:
    id === state.selectedMedicineInfoId ? null : state.selectedMedicineInfoId,
  editScans: state.editScans.filter((s) => {
    const selectedId = id == null ? state.selectedMedicineInfoId : id;
    return s.id !== selectedId;
  }),
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
    case ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS:
      return handleSelectMedicineInfoId(state, action.id);
    case ON_REMOVE_MEDICINE_INFO_PET_DETAILS:
      return handleRemoveMedicineInfo(state, action.id);
    case ON_CANCEL_PET_DETAILS_EDIT:
      return handleCancelEdit(state);
    default:
      return state;
  }
};

export const petDetails = reducer;
