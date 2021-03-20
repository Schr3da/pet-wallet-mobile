import {Share} from "react-native";

import * as Communication from "../../../communication";
import type {ICombinedReducerState} from "../../reducers";

import {onSetErrorCode, setLoading} from "../layout";
import {getTranslation} from "../../../language";
import {IPetDto} from "../../../dto/pets";
import {ErrorTypes} from "../../../enums/layout";

export const onSharePet = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  try {
    const state = getState();
    const token = state.database.token;
    const translation = getTranslation(state.layout.language);

    dispatch(setLoading(true));
    const shareUrl = await Communication.Share.requestShareUrl(id, token!);
    
    dispatch(setLoading(false));

    if (shareUrl == null) {
      dispatch(onSetErrorCode(ErrorTypes.sharePet));
      return;
    }

    await Share.share({
      message: translation.sharePetDetails.message + shareUrl,
    });
  } catch (error) {
    dispatch(setLoading(false));
    dispatch(onSetErrorCode(ErrorTypes.sharePet));
  }
};

export const ON_SET_PETS = "ON_SET_PETS";
export interface IOnSetPets {
  type: typeof ON_SET_PETS;
  data: IPetDto[];
}

export const setPets = (data: IPetDto[]): IOnSetPets => ({
  type: ON_SET_PETS,
  data,
});

export const ON_FETCH_PETS = "ON_FETCH_PETS";
interface IOnFetchPets {
  type: typeof ON_FETCH_PETS;
}

export const onFetchPets = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const token = state.database.token;

  const data = await Communication.Pets.fetchPets(token!);

  dispatch(setPets(data));
};

export type Actions = IOnSetPets | IOnFetchPets;
