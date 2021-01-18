import * as NewPet from "../../actions/new-pet";

export interface INewPetState {
  inputs: {[key in NewPet.InputIds]: NewPet.InputValues};
  profile: NewPet.IImageData | null;
  scans: NewPet.IImageData[];
}

const initialState = (): INewPetState => ({
  inputs: {} as {[key in NewPet.InputIds]: NewPet.InputValues},
  profile: null,
  scans: [],
});

const handleInputChange = (
  state: INewPetState,
  id: string,
  value: string | number | null
) => ({
  ...state,
  inputs: {...state.inputs,
    [id]: value
  }
});

const handleProfileImage = (
  state: INewPetState,
  data: NewPet.IImageData,
): INewPetState => ({
  ...state,
  profile: data,
})

const handleNewScan = (
  state: INewPetState,
  data: NewPet.IImageData,
): INewPetState => ({
  ...state,
  inputs: {...state.inputs, 
    [data.id]: null 
  },
  scans: [...state.scans, data],
});

const handleRemoveScan = (
  state: INewPetState,
  id: string
) => ({
  ...state,
  inputs: {...state.inputs,
    [id]: null
  },
  scans: state.scans.filter((s) => s.id !== id),
});

type Actions = NewPet.Actions;

const reducer = (
  state: INewPetState = initialState(),
  action: Actions 
) => {
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
    default:
      return state;
  };
}

export const newPet = reducer;
