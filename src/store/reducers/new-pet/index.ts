import {Database, NewPet, Navigation} from "../../actions";
import {IPetDto} from "../../../dto/pets";

import {IImageDataDto} from "../../../dto/image";
import {IScanResult} from "../../../dto/scan";

export interface INewPetState {
  id: string | null;
  inputs: {[key in NewPet.InputIds]: NewPet.InputValues};
  profile: IImageDataDto | null;
  scans: IScanResult[];
}

const initialState = (): INewPetState => ({
  id: null,
  inputs: {} as {[key in NewPet.InputIds]: NewPet.InputValues},
  profile: null,
  scans: [],
});

const handleInputChange = (
  state: INewPetState,
  id: string,
  value: NewPet.InputValues,
) => ({
  ...state,
  inputs: {...state.inputs, [id]: value},
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
  inputs: {
    [NewPet.InputIds.name]: data.name,
    [NewPet.InputIds.animalType]: data.animal,
    [NewPet.InputIds.dateOfBirth]: data.dateOfBirth,
  },
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
  inputs: {...state.inputs, [id]: null},
  scans: state.scans.filter((s) => s.id !== id),
});

type Actions = NewPet.Actions | Database.Actions | Navigation.Actions;

const reducer = (state: INewPetState = initialState(), action: Actions) => {
  switch (action.type) {
    case NewPet.ON_CANCEL_NEW_PET:
      return initialState();
    case NewPet.ON_INPUT_FIELD_CHANGE_NEW_PET:
      return handleInputChange(state, action.id, action.value);
    case NewPet.ON_SET_PROFILE_IMAGE_NEW_PET:
      return handleProfileImage(state, action.data);
    case NewPet.ON_REMOVE_NEW_PET_SCAN:
      return handleRemoveScan(state, action.id);
    case NewPet.ON_CREATE_NEW_PET:
      return handleCreateNewPet(state, action.data);
    case NewPet.ON_SCAN_NEW_PET:
      return handleNewScan(state, action.data);
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return initialState();
    default:
      return state;
  }
};

export const newPet = reducer;
