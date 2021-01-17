import {LanguageTypes} from "../../../language";

export enum InputIds {
  age = "age",
  name = "name",
  race = "race",
  dateOfBirth = "dateOfBirth",
}

export type InputValues = string | number | null;

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

export type Actions = 
  | IOnInputFieldChange 
  | IOnCancelNewPet
;
