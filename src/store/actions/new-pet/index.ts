import * as Communication from "../../../communication";

import {LanguageTypes} from "../../../language";
import {ICombinedReducerState} from "../../reducers";
import {IPetDto, mapStateToPet} from "../../../dto/pets";
import {onChangeSubViewComponent, SubViewComponents} from "../navigation";
import {setLoading, onSetErrorCode, ErrorTypes, onDismissDialog} from "../layout";
import {onFetchPets} from "../pets";

export interface IImageData {
  id: string;
  imageBase64: string;
  uri: string;
  fileSize: number;
  fileType: string;
  width: number;
  height: number;
  didCancel?: boolean;
}

export enum InputIds {
  age = "age",
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

export type InputValues = string | number | null | undefined | Date;

export const ON_INPUT_FIELD_CHANGE = "ON_INPUT_FIELD_CHANGE";
interface IOnInputFieldChange {
  type: typeof ON_INPUT_FIELD_CHANGE;
  id: string;
  value: InputValues;
}

export const onInputFieldChange = (
  id: string,
  value: InputValues,
): IOnInputFieldChange => ({
  type: ON_INPUT_FIELD_CHANGE,
  id,
  value,
});

export const ON_CANCEL_NEW_PET = "ON_CANCEL_NEW_PET";
interface IOnCancelNewPet {
  type: typeof ON_CANCEL_NEW_PET;
  language: LanguageTypes;
  hasPets: boolean;
}

export const onCancelNewPet = (
  language: LanguageTypes,
  hasPets: boolean,
) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const {id} = state.newPet;

  if (id != null) {
    await Communication.Pets.deletePet(state.newPet.id!, state.database.token!);
  }

  dispatch(onDismissDialog());

  dispatch({
    type: ON_CANCEL_NEW_PET,
    language,
    hasPets,
  });
};

export const ON_PROFILE_IMAGE_NEW_PET = "ON_PROFILE_IMAGE_NEW_PET";
interface IOnProfileImageNewPet {
  type: typeof ON_PROFILE_IMAGE_NEW_PET;
  data: IImageData;
}

export const onProfileImage = (data: IImageData) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  dispatch({
    type: ON_PROFILE_IMAGE_NEW_PET,
    data,
  } as IOnProfileImageNewPet);
};

export const ON_SCAN_NEW_PET_PASS = "ON_SCAN_NEW_PET_PASS";
interface IOnScanNewPetPass {
  type: typeof ON_SCAN_NEW_PET_PASS;
  data: IImageData;
}

export const onScan = (data: IImageData) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  dispatch({
    type: ON_SCAN_NEW_PET_PASS,
    data,
  } as IOnScanNewPetPass);
};

export const ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT =
  "ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT";
interface IOnRemoveNewPetPass {
  type: typeof ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT;
  id: string;
}

export const onRemoveScan = (id: string): IOnRemoveNewPetPass => ({
  type: ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT,
  id,
});

export const ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT =
  "ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT";
interface IOnPreviewNewPetPassScan {
  type: typeof ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT;
  id: string;
}

const onSetPreviewId = (id: string): IOnPreviewNewPetPassScan => ({
  type: ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT,
  id,
});

export const onPreviewScan = (id: string) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  dispatch(onSetPreviewId(id));
  dispatch(
    onChangeSubViewComponent(
      SubViewComponents.newAttachment,
      state.layout.language,
    ),
  );
};

export const ON_COMPLETE_NEW_PET = "ON_COMPLETE_NEW_PET";
interface IOnCompleteNewPet {
  type: typeof ON_COMPLETE_NEW_PET;
  language: LanguageTypes;
}

export const onCompleteNewPet = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<void> => {
  const state = getState();

  await onFetchPets()(dispatch, getState);

  dispatch({
    type: ON_COMPLETE_NEW_PET,
    language: state.layout.language, 
  }) as IOnCompleteNewPet;
};

export const ON_CREATE_NEW_PET = "ON_CREATE_NEW_PET";
interface IOnCreateNewPet {
  type: typeof ON_CREATE_NEW_PET;
  language: LanguageTypes;
  data: IPetDto;
}

export const onCreateNewPet = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const token = state.database.token;

  dispatch(setLoading(true));

  const pet = mapStateToPet(state.newPet);

  let response = null;
  if (pet.id == null) {
    response = await Communication.Pets.createNewPet(pet, token!);
  } else {
    response = await Communication.Pets.updateNewPet(pet, token!);
  }
  
  if (response == null) {
    dispatch(setLoading(false));
    return dispatch(onSetErrorCode(ErrorTypes.internetConnectionRequired));
  }

  dispatch({
    type: ON_CREATE_NEW_PET,
    language: state.layout.language,
    data: {
      id: response.id, 
      animal: response.type, 
      name: response.name, 
      dateOfBirth: response.dateOfBirth == null ? null : new Date(response.dateOfBirth), 
      age: state.newPet.inputs.age, 
      profileImage: response.avatarImage,
    },
  } as IOnCreateNewPet);

  dispatch(onChangeSubViewComponent(
    SubViewComponents.newPetScan, state.layout.language
  ));
  
  dispatch(setLoading(false));
};

export type Actions =
  | IOnInputFieldChange
  | IOnCancelNewPet
  | IOnScanNewPetPass
  | IOnProfileImageNewPet
  | IOnRemoveNewPetPass
  | IOnPreviewNewPetPassScan
  | IOnCreateNewPet
  | IOnCompleteNewPet
;
