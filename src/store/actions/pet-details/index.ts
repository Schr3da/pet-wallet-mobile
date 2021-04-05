import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog} from "../layout";
import {onGoBackNavigation} from "../navigation";

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
