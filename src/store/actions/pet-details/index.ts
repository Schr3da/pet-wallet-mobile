import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog} from "../layout";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

export const ON_TOGGLE_PET_DETAILS_MODE = "ON_TOGGLE_PET_DETAILS_MODE";
interface ITogglePetDetailsMode {
  type: typeof ON_TOGGLE_PET_DETAILS_MODE;
}

export const togglePetDetailsMode = (): ITogglePetDetailsMode => ({
  type: ON_TOGGLE_PET_DETAILS_MODE,
});

export const ON_CANCEL_PET_DETAILS_EDIT = "ON_CANCEL_PET_DETAILS_EDIT";
interface IOnCancelPetDetailsEdit {
  type: typeof ON_CANCEL_PET_DETAILS_EDIT;
}

export const onCancelPetDetailsEdit = (
  dispatch: any,
  _: () => ICombinedReducerState,
) => {
  dispatch(onDismissDialog());
  dispatch(setLoading(false));
  dispatch({type: ON_CANCEL_PET_DETAILS_EDIT});
};

export type Actions = ITogglePetDetailsMode | IOnCancelPetDetailsEdit;
