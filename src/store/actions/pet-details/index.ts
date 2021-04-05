import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog} from "../layout";
import {onGoBackNavigation} from "../navigation";
import {deletePet} from "../../../communication/pets";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

export const onCancelPetDetailsEdit = (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const {language} = state.layout;

  dispatch(onDismissDialog());
  dispatch(setLoading(false));
  dispatch(onGoBackNavigation(language));
};

export const onRemovePet = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const {language} = state.layout;
  const token = state.database.token;

  await deletePet(id, token!);

  dispatch(onGoBackNavigation(language));
};
