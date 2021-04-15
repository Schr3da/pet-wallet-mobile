import {ICombinedReducerState} from "../../reducers";
import {setLoading, onDismissDialog, onSetErrorCode, onSetNotificationType} from "../layout";
import {deletePet, updatePet} from "../../../communication/pets";
import {IImageDataDto} from "../../../dto/image";
import {requestScan, getNotes, postNotes} from "../../../communication/wallet";
import {ErrorTypes, NotificationTypes} from "../../../enums/layout";
import {onShowScanResult} from "../scan-result";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {onSetValuesFor} from "../inputs";
import {INotesDto} from "../../../dto/pets";

import {
  base64ImageString,
  arrayToDictionary,
} from "../../../components/common/utils";

import {
  onGoBackNavigation,
  onChangeViewComponent,
  onChangeSubViewComponent,
  onShowHomeComponent,
} from "../navigation";

export enum InputIds {
  name = "name",
  animalType = "animal",
  dateOfBirth = "dateOfBirth",
  notes = "animalNotes",
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

  const petData = mapToInputs(id, state);
  if (petData == null) {
    return;
  }

  dispatch(setLoading(true));

  const notes = await fetchNotes(id)(dispatch, getState);
  const noteData = arrayToDictionary(notes, (n) => n.body);

  dispatch(
    onSetValuesFor(
      {...petData, ...noteData},
      ViewComponents.petDetails,
      SubViewComponents.none,
    ),
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

  dispatch(setLoading(false));
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
  dispatch(onGoBackNavigation(language));
  dispatch(setLoading(false));
};

export const onRemovePet = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const token = state.database.token;

  const {language} = state.layout;

  dispatch(setLoading(true));
  
  await deletePet(id, token!);

  dispatch(onGoBackNavigation(language));

  dispatch(onDismissDialog());

  dispatch(setLoading(false));
};

export const onSave = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const petId = state.pets.selectedId;
  if (petId == null) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
    return;
  }

  dispatch(setLoading(true));

  await updatePet(petId, state);

  await postNotes(petId, state);

  await onShowHomeComponent()(dispatch, getState);

  await onShowPetDetails(petId)(dispatch, getState);

  dispatch(setLoading(false));

  dispatch(onSetNotificationType(NotificationTypes.savedData));
};

export const onShowEditView = (id: string) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const {language} = state.layout;

  const {notes} = state.petDetails;

  const data = mapToInputs(id, state);
  if (data == null) {
    return;
  }

  const noteData = arrayToDictionary(notes, (n) => n.body);

  dispatch(
    onSetValuesFor(
      {...data, ...noteData},
      ViewComponents.petDetails,
      SubViewComponents.petDetailsEdit,
    ),
  );

  dispatch(
    onChangeSubViewComponent(SubViewComponents.petDetailsEdit, language),
  );
};

export const ON_SET_PROFILE_IMAGE_PET_DETAILS =
  "ON_SET_PROFILE_IMAGE_PET_DETAILS";
interface IOnSetProfileImagePetDetails {
  type: typeof ON_SET_PROFILE_IMAGE_PET_DETAILS;
  data: IImageDataDto;
}

export const onProfileImage = (data: IImageDataDto) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  const action: IOnSetProfileImagePetDetails = {
    type: ON_SET_PROFILE_IMAGE_PET_DETAILS,
    data,
  };

  dispatch(action);
};

export const ON_FETCH_NOTES_PET_DETAILS = "ON_FETCH_NOTES_PET_DETAILS";
interface IOnFetchNotesPetDetails {
  type: typeof ON_FETCH_NOTES_PET_DETAILS;
  data: INotesDto[];
}

export const fetchNotes = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<INotesDto[]> => {
  const state = getState();

  const {token} = state.database;

  const data = await getNotes(id, token);

  const action: IOnFetchNotesPetDetails = {
    type: ON_FETCH_NOTES_PET_DETAILS,
    data,
  };

  dispatch(action);
  return data;
};

export type Actions =
  | IOnShowPetDetails
  | IOnSetProfileImagePetDetails
  | IOnFetchNotesPetDetails
;
