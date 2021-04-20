import * as Communication from "../../../communication";

import type {ICombinedReducerState} from "../../reducers";
import type {IPetDto} from "../../../dto/pets";
import type {IImageDataDto} from "../../../dto/image";
import type {IScanResult, IScanDataPrefillsDto} from "../../../dto/scan";

import {LanguageTypes} from "../../../language";

import {SubViewComponents} from "../../../enums/navigation";
import {ErrorTypes} from "../../../enums/layout";
import {setLoading, onSetErrorCode, onDismissDialog} from "../layout";
import {requestScan, saveScanResults} from "../../../communication/wallet";
import {onShowScanResult, onResetScanResult} from "../scan-result";
import {onResetInputsFor} from "../inputs";

import {
  base64ImageString,
  convertScansToScanResult,
} from "../../../components/common/utils";

import {
  onChangeSubViewComponent,
  onShowHomeComponent,
  onGoBackNavigation,
} from "../navigation";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

export const onSkipAction = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  dispatch(onDismissDialog());
  await onShowHomeComponent()(dispatch, getState);
};

export const onCancelNewPet = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const {id} = state.newPet;

  if (id != null) {
    await Communication.Pets.deletePet(state.newPet.id!, state.database.token!);
  }

  dispatch(onDismissDialog());
  await onShowHomeComponent()(dispatch, getState);
};

export const ON_SET_PROFILE_IMAGE_NEW_PET = "ON_PROFILE_IMAGE_NEW_PET";
interface IOnSetProfileImageNewPet {
  type: typeof ON_SET_PROFILE_IMAGE_NEW_PET;
  data: IImageDataDto;
}

export const onProfileImage = (data: IImageDataDto) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  dispatch({
    type: ON_SET_PROFILE_IMAGE_NEW_PET,
    data,
  } as IOnSetProfileImageNewPet);
};

export const ON_REMOVE_NEW_PET_SCAN = "ON_REMOVE_NEW_PET_SCAN";
interface IOnRemoveNewPetScan {
  type: typeof ON_REMOVE_NEW_PET_SCAN;
  id: string;
}

export const onRemoveScan = (id: string): IOnRemoveNewPetScan => ({
  type: ON_REMOVE_NEW_PET_SCAN,
  id,
});

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

  let data = null;
  if (state.newPet.id == null) {
    data = await Communication.Pets.createNewPet(state, token!);
  } else {
    data = await Communication.Pets.updateNewPet(state, token!);
  }

  if (data == null) {
    dispatch(setLoading(false));
    return dispatch(onSetErrorCode(ErrorTypes.internetConnectionRequired));
  }

  dispatch({
    type: ON_CREATE_NEW_PET,
    language: state.layout.language,
    data,
  });

  dispatch(
    onChangeSubViewComponent(
      SubViewComponents.newPetScan,
      state.layout.language,
    ),
  );

  dispatch(setLoading(false));
};

export const ON_SCAN_NEW_PET = "ON_SCAN_NEW_PET";
interface IOnScanNewPet {
  type: typeof ON_SCAN_NEW_PET;
  data: IScanResult;
}

export const onScan = (image: IImageDataDto) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const base64Image = base64ImageString(image);
  if (base64Image == null) {
    return;
  }

  const state = getState();
  const token = state.database.token;
  const id = state.newPet.id;

  dispatch(setLoading(true));

  const data = await requestScan(id!, base64Image, token!);

  if (data == null) {
    dispatch(setLoading(false));
    return dispatch(onSetErrorCode(ErrorTypes.internetConnectionRequired));
  }

  const mappedData: IScanResult = {
    id: image.id,
    image: {...image},
    data,
  };

  dispatch({
    type: ON_SCAN_NEW_PET,
    data: mappedData,
  } as IOnScanNewPet);

  dispatch(onShowScanResult(image, data));

  dispatch(setLoading(false));

  if (data.suggestions.de.length === 0 && data.suggestions.en.length === 0) {
    dispatch(onSetErrorCode(ErrorTypes.scanResultEmpty));
  }
};

export const ON_SAVE_SCAN_RESULT = "ON_SAVE_SCAN_RESULT";
interface IOnSaveScanResult {
  id: string;
  type: typeof ON_SAVE_SCAN_RESULT;
  data: IScanDataPrefillsDto;
}

export const onSaveScanResult = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<void> => {
  const state = getState();

  const {layout, scan, navigation} = getState();
  const {mainViewComponent, subViewComponent} = navigation;
  const {language} = layout;
  const {id} = scan;

  const data = convertScansToScanResult(state);

  if (data == null) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
    dispatch(onDismissDialog());
    return;
  }

  dispatch({
    type: ON_SAVE_SCAN_RESULT,
    data: data.prefills,
    id,
  } as IOnSaveScanResult);

  dispatch(onResetInputsFor(mainViewComponent, subViewComponent));
  dispatch(onResetScanResult());
  dispatch(onGoBackNavigation(language));
  dispatch(onDismissDialog());
};

export const onCompleteNewPet = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const token = state.database.token!;
  const language = state.layout.language;

  dispatch(setLoading(true));

  const {id, scans} = state.newPet;
  const isSuccesful = await saveScanResults(id, scans, language, token);

  dispatch(onShowHomeComponent());

  dispatch(setLoading(false));

  isSuccesful === false
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : null;
};

export type Actions =
  | IOnSetProfileImageNewPet
  | IOnRemoveNewPetScan
  | IOnCreateNewPet
  | IOnScanNewPet
  | IOnSaveScanResult;
