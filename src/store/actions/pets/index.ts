import {Share} from "react-native";

import * as Communication from "../../../communication";
import type {ICombinedReducerState} from "../../reducers";

import {
  onChangeViewComponent,
  ViewComponents,
  SubViewComponents,
} from "../navigation";

import {onSetErrorCode, ErrorTypes, setLoading} from "../layout";
import {getTranslation} from "../../../language";

export const onSharePet = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  try {
    const state = getState();
    const translation = getTranslation(state.layout.language);

    dispatch(setLoading(true));
    const shareUrl = await Communication.Share.createShareUrl(id); 
    dispatch(setLoading(false));
  
    await Share.share({
      message: translation.sharePetDetails.message + shareUrl, 
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(onSetErrorCode(ErrorTypes.sharePet));
  } 
};

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
  dispatch(
    onChangeViewComponent(
      ViewComponents.petDetails,
      SubViewComponents.none,
      language,
    ),
  );
};

export type Actions = IOnShowPetDetails;
