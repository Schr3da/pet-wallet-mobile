import {Database, NewPet, Navigation} from "../../actions";
import {IPetDto} from "../../../dto/pets";
import {LanguageTypes} from "../../../language";
import {createUuid} from "../../../components/common/utils";

export interface INewPetState {
  id: string | null;
  inputs: {[key in NewPet.InputIds]: NewPet.InputValues};
  profile: NewPet.IImageData | null;
  scans: NewPet.IScanResult[];
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
  id: data.id,
  inputs: {
    [NewPet.InputIds.name]: data.name,
    [NewPet.InputIds.age]: data.age,
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

const handleScanPreview = (state: INewPetState, id: string): INewPetState => ({
  ...state,
  scans: state.scans.map((scan) => {
    scan.isSelected = scan.id === id;
    return scan;
  }),
});

const handleNewScan = (
  state: INewPetState,
  data: NewPet.IScanResult,
): INewPetState => ({
  ...state,
  inputs: {...state.inputs, [data.id]: null},
  scans: [
    ...state.scans.map((s) => {
      s.isSelected === false;
      return s;
    }),
    {...data},
  ],
});

const handleNewScanEntity = (state: INewPetState): INewPetState => {
  const scans = [...state.scans];

  const match = scans.find((s) => s.isSelected);
  if (match == null) {
    return state;
  }

  const emptyEntity = {
    id: createUuid(),
    shortInfo: "",
    longInfo: "",
    url: "",
    isSelected: true,
  };

  match.data.prefills.de.push({...emptyEntity, language: LanguageTypes.de});
  match.data.prefills.en.push({...emptyEntity, language: LanguageTypes.en});

  return {
    ...state,
    scans,
  };
};

const handleToggleSelection = (
  state: INewPetState,
  id: string,
): INewPetState => {
  const scans = [...state.scans];

  const match = scans.find((s) => s.isSelected);
  if (match == null) {
    return state;
  }

  const matchDE = match.data.prefills.de.find((p) => p.id === id);
  if (matchDE) {
    matchDE.isSelected = !matchDE.isSelected;
  }

  const matchEN = match.data.prefills.en.find((p) => p.id === id);
  if (matchEN) {
    matchEN.isSelected = !matchEN.isSelected;
  }

  return {
    ...state,
    scans,
  };
};

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
    case NewPet.ON_SCAN_NEW_PET:
      return handleNewScan(state, action.data);
    case NewPet.ON_REMOVE_NEW_PET_SCAN:
      return handleRemoveScan(state, action.id);
    case NewPet.ON_CREATE_NEW_PET:
      return handleCreateNewPet(state, action.data);
    case NewPet.ON_PREVIEW_NEW_PET_SCAN:
      return handleScanPreview(state, action.id);
    case NewPet.ON_CREATE_NEW_SCAN_ENTITY_NEW_PET:
      return handleNewScanEntity(state);
    case NewPet.ON_TOGGLE_SELECTION_SCAN_ENTITY_NEW_PET:
      return handleToggleSelection(state, action.id);
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return initialState();
    default:
      return state;
  }
};

export const newPet = reducer;
