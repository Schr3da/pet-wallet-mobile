export enum InputIds {
  sample = "sample"
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

export type Actions = 
  | IOnInputFieldChange 
;
