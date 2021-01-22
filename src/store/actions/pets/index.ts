import type {ICombinedReducerState} from "../../reducers";

import {
  onChangeViewComponent,
  ViewComponents,
  SubViewComponents
} from "../navigation";

export const ON_SHOW_PET_DETAILS = "ON_SHOW_PET_DETAILS";
interface IOnShowPetDetails {
  type: typeof ON_SHOW_PET_DETAILS;
  id: string;
}

export const onShowPetDetails = (id: string) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  dispatch({type: ON_SHOW_PET_DETAILS, id});

  const state = getState();
  if (state.pets.selectedId == null) {
    return;
  }

  const language = state.layout.language;
  dispatch(onChangeViewComponent(ViewComponents.petDetails, SubViewComponents.none, language));
};

export type Actions = 
  | IOnShowPetDetails
;
