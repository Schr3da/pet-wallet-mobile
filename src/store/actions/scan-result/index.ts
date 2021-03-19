import {IScanDataDto} from "../../../dto/scan";
import {ICombinedReducerState} from "../../reducers";
import {onChangeSubViewComponent, onGoBackNavigation} from "../navigation";
import {SubViewComponents} from "../../../enums/navigation";
import {IImageDataDto} from "../../../dto/image";

export type InputValues = string | number | null | undefined | Date;

export const ON_INPUT_FIELD_CHANGE_SCAN_RESULT =
  "ON_INPUT_FIELD_CHANGE_SCAN_RESULT";
interface IOnInputFieldChangeScanResult {
  type: typeof ON_INPUT_FIELD_CHANGE_SCAN_RESULT;
  id: string;
  value: InputValues;
}

export const onInputFieldChange = (
  id: string,
  value: InputValues,
): IOnInputFieldChangeScanResult => ({
  type: ON_INPUT_FIELD_CHANGE_SCAN_RESULT,
  id,
  value,
});

export const ON_SET_DATA_FOR_SCAN_RESULT = "ON_SET_DATA_FOR_SCAN_RESULT";
interface IOnSetDataScanResult {
  type: typeof ON_SET_DATA_FOR_SCAN_RESULT;
  image: IImageDataDto | null;
  data: IScanDataDto | null;
}

const onSetDataForScanResult = (
  image: IImageDataDto | null,
  data: IScanDataDto | null,
): IOnSetDataScanResult => ({
  type: ON_SET_DATA_FOR_SCAN_RESULT,
  image,
  data,
});

export const onShowScanResult = (image: IImageDataDto, data: IScanDataDto) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  dispatch(onSetDataForScanResult(image, data));
  dispatch(
    onChangeSubViewComponent(
      SubViewComponents.newScanResult,
      state.layout.language,
    ),
  );
};

export const ON_CREATE_NEW_SCAN_ENTITY = "ON_CREATE_NEW_SCAN_ENTITY";
interface IOnCreateNewScanEntity {
  type: typeof ON_CREATE_NEW_SCAN_ENTITY;
}

export const onCreateNewScanEntity = (): IOnCreateNewScanEntity => ({
  type: ON_CREATE_NEW_SCAN_ENTITY,
});

export const ON_REMOVE_NEW_SCAN_ENTITY = "ON_REMOVE_NEW_SCAN_ENTITY";
interface IOnRemoveNewScanEntity {
  type: typeof ON_REMOVE_NEW_SCAN_ENTITY;
  id: string;
}

export const onRemoveNewScanEntity = (id: string): IOnRemoveNewScanEntity => ({
  type: ON_REMOVE_NEW_SCAN_ENTITY,
  id,
});

export const ON_TOGGLE_SELECTION_SCAN_ENTITY =
  "ON_TOGGLE_SELECTION_SCAN_ENTITY";
interface IOnSelectScanEntity {
  type: typeof ON_TOGGLE_SELECTION_SCAN_ENTITY;
  id: string;
}

export const onToggleSelectionScanEntity = (
  id: string,
): IOnSelectScanEntity => ({
  type: ON_TOGGLE_SELECTION_SCAN_ENTITY,
  id,
});

export const ON_RESET_SCAN_RESULT = "ON_RESET_SCAN_RESULT";
interface IOnResetScanResult {
  type: typeof ON_RESET_SCAN_RESULT;
}

export const onResetScanResult = (): IOnResetScanResult => ({
  type: ON_RESET_SCAN_RESULT,
});

export const onCancelScanResult = () => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();
  const language = state.layout.language;

  dispatch(onGoBackNavigation(language));
  dispatch(onResetScanResult());
};

export type Actions =
  | IOnInputFieldChangeScanResult
  | IOnSetDataScanResult
  | IOnCreateNewScanEntity
  | IOnSelectScanEntity
  | IOnResetScanResult
  | IOnRemoveNewScanEntity;
