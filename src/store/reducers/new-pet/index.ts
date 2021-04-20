import {Database, NewPet, Navigation, ScanResult} from "../../actions";
import {IPetDto} from "../../../dto/pets";

import {IImageDataDto} from "../../../dto/image";
import {IScanResult, IScanDataSuggestionsDto} from "../../../dto/scan";

export interface INewPetState {
  id: string | null;
  profile: IImageDataDto | null;
  scans: IScanResult[];
}

const initialState = (): INewPetState => ({
  id: null,
  profile: null,
  scans: [],
});

const handleProfileImage = (
  state: INewPetState,
  data: IImageDataDto,
): INewPetState => ({
  ...state,
  profile: data,
});

const handleCreateNewPet = (
  state: INewPetState,
  data: IPetDto,
): INewPetState => ({
  ...state,
  id: data.id,
  scans: [],
  profile:
    state.profile == null || data.profileImage == null
      ? null
      : {
          ...state.profile,
          imageBase64: data.profileImage,
        },
});

const handleNewScan = (
  state: INewPetState,
  data: IScanResult,
): INewPetState => ({
  ...state,
  scans: [...state.scans, data],
});

const handleRemoveScan = (state: INewPetState, id: string) => ({
  ...state,
  scans: state.scans.filter((s) => s.id !== id),
});

const handleSaveNewScanResult = (
  state: INewPetState,
  id: string,
  data: IScanDataSuggestionsDto,
): INewPetState => {
  const scans = [...(state.scans || [])];
  const match = scans.find((s) => s.id === id);
  if (match == null) {
    return state;
  }

  match.data.prefills = data;

  return {
    ...state,
    scans,
  };
};

type Actions =
  | NewPet.Actions
  | Database.Actions
  | Navigation.Actions
  | ScanResult.Actions;

const reducer = (state: INewPetState = initialState(), action: Actions) => {
  switch (action.type) {
    case NewPet.ON_SET_PROFILE_IMAGE_NEW_PET:
      return handleProfileImage(state, action.data);
    case NewPet.ON_REMOVE_NEW_PET_SCAN:
      return handleRemoveScan(state, action.id);
    case NewPet.ON_CREATE_NEW_PET:
      return handleCreateNewPet(state, action.data);
    case ScanResult.ON_NEW_PET_PASS_SCAN_RESULT:
      return handleNewScan(state, action.data);
    case NewPet.ON_SAVE_SCAN_RESULT:
      return handleSaveNewScanResult(state, action.id, action.data);
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return initialState();
    case Database.ON_REQUEST_DATA_DELETION:
      return initialState();
    default:
      return state;
  }
};

export const newPet = reducer;
