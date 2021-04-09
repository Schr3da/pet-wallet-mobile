import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog, onSetErrorCode} from "../layout";
import {
  onGoBackNavigation,
  onChangeViewComponent,
  onChangeSubViewComponent,
} from "../navigation";
import {deletePet} from "../../../communication/pets";
import {IImageDataDto} from "../../../dto/image";
import {base64ImageString} from "../../../components/common/utils";
import {requestScan} from "../../../communication/wallet";
import {ErrorTypes} from "../../../enums/layout";
import {onShowScanResult} from "../scan-result";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {onSetValuesFor} from "../inputs";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
}

const mapToInputs = (id: string, state: ICombinedReducerState) => {
  const data = state.pets.data.find((d) => id === d.id);

  if (data == null) {
    return null;
  }

  const {name, animal, dateOfBirth} = data;

  return {
    name,
    animal,
    dateOfBirth,
  };
};

export const ON_SHOW_PET_DETAILS = "ON_SHOW_PET_DETAILS";
interface IOnShowPetDetails {
  type: typeof ON_SHOW_PET_DETAILS;
  id: string;
}

export const onShowPetDetails = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const data = mapToInputs(id, state);
  if (data == null) {
    return;
  }

  dispatch(
    onSetValuesFor(data, ViewComponents.petDetails, SubViewComponents.none),
  );

  dispatch({
    type: ON_SHOW_PET_DETAILS,
    id,
  } as IOnShowPetDetails);

  const language = state.layout.language;

  dispatch(
    onChangeViewComponent(
      ViewComponents.petDetails,
      SubViewComponents.none,
      language,
    ),
  );
};

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
  dispatch(onDismissDialog());
};

export const onShowEditView = (id: string) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const {language} = state.layout;

  const data = mapToInputs(id, state);
  if (data == null) {
    return;
  }

  dispatch(
    onSetValuesFor(
      data,
      ViewComponents.petDetails,
      SubViewComponents.petDetailsEdit,
    ),
  );

  dispatch(
    onChangeSubViewComponent(SubViewComponents.petDetailsEdit, language),
  );
};

export const ON_SET_PROFILE_IMAGE_PET_DETAILS = "ON_SET_PROFILE_IMAGE_PET_DETAILS";
interface IOnSetProfileImagePetDetails {
  type: typeof ON_SET_PROFILE_IMAGE_PET_DETAILS;
  data: IImageDataDto;
}

export const onProfileImage = (data: IImageDataDto) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  const action: IOnSetProfileImagePetDetails =  {
    type: ON_SET_PROFILE_IMAGE_PET_DETAILS,
    data,
  };

  dispatch(action);
};

export type Actions = 
  | IOnShowPetDetails
  | IOnSetProfileImagePetDetails
;
