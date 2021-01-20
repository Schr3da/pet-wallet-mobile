import {LanguageTypes} from "../../../language";
import {ICombinedReducerState} from "../../reducers";
import {IPetDto} from "../../../dto/pets";
import {base64ImageString} from "../../../components/common/utils";

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
  race = "race",
  dateOfBirth = "dateOfBirth",
};

export type InputValues = string | number | null | undefined;

export const ON_INPUT_FIELD_CHANGE = "ON_INPUT_FIELD_CHANGE";
interface IOnInputFieldChange {
  type: typeof ON_INPUT_FIELD_CHANGE;
  id: string;
  value: InputValues;
}

export const onInputFieldChange= (
  id: string,
  value: InputValues 
): IOnInputFieldChange => ({
  type: ON_INPUT_FIELD_CHANGE,
  id,
  value
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
): IOnCancelNewPet => ({
  type: ON_CANCEL_NEW_PET,
  language,
  hasPets,
});

export const ON_PROFILE_IMAGE_NEW_PET = "ON_PROFILE_IMAGE_NEW_PET";
interface IOnProfileImageNewPet {
  type: typeof ON_PROFILE_IMAGE_NEW_PET;
  data: IImageData; 
}

export const onProfileImage = (
  data: IImageData
) => (dispatch: any) => {
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

export const onScan = (
  data: IImageData
) => (dispatch: any) => {
  dispatch({
    type: ON_SCAN_NEW_PET_PASS,
    data, 
  } as IOnScanNewPetPass);
};

export const ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT = "ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT";
interface IOnRemoveNewPetPass {
  type: typeof ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT;
  id: string; 
}

export const onRemoveScan = (
  id: string 
): IOnRemoveNewPetPass => ({
  type: ON_REMOVE_SCAN_NEW_PET_PASS_ATTACHMENT,
  id, 
});

export const ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT = "ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT";
interface IOnPreviewNewPetPassScan{
  type: typeof ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT;
  id: string; 
}

export const onPreviewScan = (
  id: string 
): IOnPreviewNewPetPassScan => ({
  type: ON_PREVIEW_SCAN_NEW_PET_PASS_ATTACHMENT,
  id, 
});

export const ON_SAVE_NEW_PET = "ON_SAVE_NEW_PET";
interface IOnSaveNewPet {
  type: typeof ON_SAVE_NEW_PET;
  language: LanguageTypes;
  data: IPetDto;
}

export const onSaveNewPet = () => (
  dispatch: any,
  getState: () => ICombinedReducerState
) => {
  const state = getState();
  const newPet = state.newPet;

  dispatch({
    type: ON_SAVE_NEW_PET,
    language: state.layout.language,
    data: {
      id: Date.now().toString(),
      animal: newPet.inputs[InputIds.race],
      name: newPet.inputs[InputIds.name] || "",
      dateOfBirth: newPet.inputs[InputIds.dateOfBirth] || "",
      age: newPet.inputs[InputIds.age] || "",
      profileImage: base64ImageString(newPet.profile),
    }
  } as IOnSaveNewPet);
};

export type Actions = 
  | IOnInputFieldChange 
  | IOnCancelNewPet
  | IOnScanNewPetPass
  | IOnProfileImageNewPet
  | IOnRemoveNewPetPass
  | IOnPreviewNewPetPassScan
  | IOnSaveNewPet
;
