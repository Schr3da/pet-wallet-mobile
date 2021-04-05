import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog, onSetErrorCode} from "../layout";
import {onGoBackNavigation} from "../navigation";
import {deletePet} from "../../../communication/pets";
import {IImageDataDto} from "../../../dto/image";
import {base64ImageString} from "../../../components/common/utils";
import {requestScan} from "../../../communication/wallet";
import {ErrorTypes} from "../../../enums/layout";
import {onShowScanResult} from "../scan-result";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

export const onScan = (id: string | null, image: IImageDataDto) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const base64Image = base64ImageString(image);
  if (base64Image == null) {
    return;
  }

  const state = getState();
  const token = state.database.token;

  dispatch(setLoading(true));

  const data = await requestScan(id!, base64Image, token!);

  if (data == null) {
    dispatch(setLoading(false));
    return dispatch(onSetErrorCode(ErrorTypes.internetConnectionRequired));
  }

  dispatch(onShowScanResult(image, data));

  dispatch(setLoading(false));

  if (data.suggestions.de.length === 0 && data.suggestions.en.length === 0) {
    dispatch(onSetErrorCode(ErrorTypes.scanResultEmpty));
  }
};

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
