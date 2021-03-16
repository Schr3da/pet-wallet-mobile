import {Database, NewPet, Navigation} from "../../actions";
import {IPetDto} from "../../../dto/pets";

export interface INewPetState {
  id: string | null;
  inputs: {[key in NewPet.InputIds]: NewPet.InputValues};
  profile: NewPet.IImageData | null;
  scans: NewPet.IImageData[];
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
  data: NewPet.IImageData,
): INewPetState => ({
  ...state,
  profile: data,
});

const handleCreateNewPet = (
  state: INewPetState,
  data: IPetDto,
): INewPetState => ({
  ...state,
  inputs: {
    [NewPet.InputIds.name]: data.name,
    [NewPet.InputIds.age]: data.age,
    [NewPet.InputIds.animalType]: data.animal,
    [NewPet.InputIds.dateOfBirth]: data.dateOfBirth,
  },
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
  data: NewPet.IImageData,
): INewPetState => ({
  ...state,
  inputs: {...state.inputs, [data.id]: null},
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
    case NewPet.ON_INPUT_FIELD_CHANGE:
      return handleInputChange(state, action.id, action.value);
    case NewPet.ON_PROFILE_IMAGE_NEW_PET:
      return handleProfileImage(state, action.data);
    case NewPet.ON_SCAN_NEW_PET_PASS:
      return handleNewScan(state, action.data);
    case NewPet.ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT:
      return handleRemoveScan(state, action.id);
    case NewPet.ON_CREATE_NEW_PET:
      return handleCreateNewPet(state, action.data);
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return initialState();
    default:
      return state;
  }
};

export const newPet = reducer;
