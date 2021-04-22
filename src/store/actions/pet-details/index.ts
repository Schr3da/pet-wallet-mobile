import {ICombinedReducerState} from "../../reducers";
import {deletePet, updatePet} from "../../../communication/pets";
import {IImageDataDto} from "../../../dto/image";
import {ErrorTypes, NotificationTypes} from "../../../enums/layout";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {onSetValuesFor} from "../inputs";
import {INotesDto, IScanDto} from "../../../dto/pets";

import {
  setLoading,
  onDismissDialog,
  onSetErrorCode,
  onSetNotificationType,
} from "../layout";

import {
  getNotes,
  postNotes,
  fetchScanResults,
  saveScanResults,
  updateScanResult,
} from "../../../communication/wallet";

import {
  arrayToDictionary,
  convertScansToScanResult,
} from "../../../components/common/utils";

import {
  onGoBackNavigation,
  onChangeViewComponent,
  onChangeSubViewComponent,
  onShowHomeComponent,
} from "../navigation";
import {ON_CHANGE_FILTER} from "../filters";

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
  let state = getState();

  const petData = mapToInputs(id, state);
  if (petData == null) {
    return;
  }

  dispatch(setLoading(true));

  await onFetchScanResult(id)(dispatch, getState);
  await onFetchNotes(id)(dispatch, getState);

  state = getState();
  const {notes, scans} = state.petDetails;

  const noteInputs = arrayToDictionary(notes, (n) => n.body);
  const scanInputs = arrayToDictionary(scans, (n) => n.title);

  dispatch(
    onSetValuesFor(
      {...petData, ...noteInputs, ...scanInputs},
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

export const ON_FETCH_NOTES_PET_DETAILS = "ON_FETCH_NOTES_PET_DETAILS";
interface IOnFetchNotesPetDetails {
  type: typeof ON_FETCH_NOTES_PET_DETAILS;
  data: INotesDto[];
}

export const onFetchNotes = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<void> => {
  const state = getState();
  const token = state.database.token;

  const data = await getNotes(id, token);

  const action: IOnFetchNotesPetDetails = {
    type: ON_FETCH_NOTES_PET_DETAILS,
    data,
  };

  dispatch(action);
};

export const ON_FETCH_SCAN_RESULTS_PET_DETAILS =
  "ON_FETCH_SCAN_RESULTS_PET_DETAILS";
interface IOnFetchScanResultPetDetails {
  type: typeof ON_FETCH_SCAN_RESULTS_PET_DETAILS;
  data: IScanDto[];
}

export const onFetchScanResult = (id: string) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<void> => {
  const state = getState();
  const token = state.database.token;

  const data = await fetchScanResults(id, token);

  const action: IOnFetchScanResultPetDetails = {
    type: ON_FETCH_SCAN_RESULTS_PET_DETAILS,
    data,
  };

  dispatch(action);
};

export const onSaveScanResult = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const id = state.pets.selectedId;

  dispatch(onDismissDialog());

  if (id == null) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
    return;
  }

  const data = convertScansToScanResult(state);

  if (data == null) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
    return;
  }

  const newScan = state.petDetails.newScan;
  if (newScan == null) {
    dispatch(onSetErrorCode(ErrorTypes.unexpected));
    return;
  }
  newScan.data = data;

  const token = state.database.token!;
  const language = state.layout.language;

  dispatch(setLoading(true));

  const isSuccesful = await saveScanResults(id, [newScan], language, token);

  dispatch(onShowHomeComponent(false));
  dispatch(onShowPetDetails(id));

  isSuccesful === false
    ? dispatch(onSetErrorCode(ErrorTypes.unexpected))
    : null;
};



export const ON_CANCEL_PET_DETAILS_EDIT = "ON_CANCEL_PET_DETAILS_EDIT";
interface IOnCancelPetDetailsEdit {
  type: typeof ON_CANCEL_PET_DETAILS_EDIT;
}

export const onCancelPetDetailsEdit = (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const {language} = state.layout;

  dispatch(onDismissDialog());
  dispatch(onGoBackNavigation(language));
  dispatch(setLoading(false));
  dispatch({type: ON_CANCEL_PET_DETAILS_EDIT});
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

  await updateScanResult(petId, state);

  await onShowHomeComponent(false)(dispatch, getState);

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

  const filter = (
    state.filters[ViewComponents.petDetails][SubViewComponents.none] || []
  ).find((f) => f.isSelected);
  if (filter != null) {
    dispatch({
      type: ON_CHANGE_FILTER,
      id: filter.id,
      mainViewComponent: ViewComponents.petDetails,
      subViewComponent: SubViewComponents.petDetailsEdit,
    });
  }

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

export const ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS =
  "ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS";
interface IOnSetSelectedMedicineInfoIdPetDetails {
  type: typeof ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS;
  id: string | null;
}

export const onSetSelectedMedicineInfoId = (
  id: string | null,
): IOnSetSelectedMedicineInfoIdPetDetails => ({
  type: ON_SET_SELECTED_MEDICINE_ID_PET_DETAILS,
  id,
});

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

export const ON_REMOVE_MEDICINE_INFO_PET_DETAILS =
  "ON_REMOVE_MEDICINE_INFO_PET_DETAILS";
interface IOnRemoveMedicineInfoPetDetails {
  type: typeof ON_REMOVE_MEDICINE_INFO_PET_DETAILS;
  id?: string;
}

export const onRemoveMedicineInfo = (id?: string) => (
  dispatch: any,
  _getState: () => ICombinedReducerState,
) => {
  const action: IOnRemoveMedicineInfoPetDetails = {
    type: ON_REMOVE_MEDICINE_INFO_PET_DETAILS,
    id,
  };

  dispatch(action);
  dispatch(onDismissDialog());
};

export type Actions =
  | IOnShowPetDetails
  | IOnSetProfileImagePetDetails
  | IOnFetchNotesPetDetails
  | IOnFetchScanResultPetDetails
  | IOnSetSelectedMedicineInfoIdPetDetails
  | IOnRemoveMedicineInfoPetDetails
  | IOnCancelPetDetailsEdit
;
