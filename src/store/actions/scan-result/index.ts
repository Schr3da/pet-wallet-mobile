import {IScanDataDto, IScanResult} from "../../../dto/scan";
import {ICombinedReducerState} from "../../reducers";
import {onChangeSubViewComponent, onGoBackNavigation} from "../navigation";
import {SubViewComponents} from "../../../enums/navigation";
import {IImageDataDto} from "../../../dto/image";
import {onSetValuesFor, onResetInputsFor} from "../inputs";
import {LanguageTypes} from "../../../language";
import {InputValues} from "../../../enums/input";
import {base64ImageString, createUuid} from "../../../components/common/utils";
import {setLoading, onSetErrorCode} from "../layout";
import {requestScan} from "../../../communication/wallet";
import {ErrorTypes} from "../../../enums/layout";

export const onNewEmptyScan = () => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const mappedData: IScanResult = {
    id: createUuid(),
    image: null as any,
    data: {
      prefills: {
        [LanguageTypes.en]: [],
        [LanguageTypes.de]: [],
      },
      suggestions: {
        [LanguageTypes.en]: [],
        [LanguageTypes.de]: [],
      },
    },
  };

  const action: IOnNewPetPassScanResult = {
    type: ON_NEW_PET_PASS_SCAN_RESULT,
    data: mappedData,
  };

  dispatch(action);

  dispatch(onShowScanResult(null, mappedData.data));
};

export const ON_NEW_PET_PASS_SCAN_RESULT = "ON_NEW_PET_PASS_SCAN_RESULT";
interface IOnNewPetPassScanResult {
  type: typeof ON_NEW_PET_PASS_SCAN_RESULT;
  data: IScanResult;
}

export const onScan = (
  id: string | null,
  image: IImageDataDto | null,
) => async (dispatch: any, getState: () => ICombinedReducerState) => {
  if (id == null || image == null) {
    return;
  }

  const base64Image = base64ImageString(image);
  if (base64Image == null) {
    return;
  }

  const state = getState();
  const token = state.database.token;

  dispatch(setLoading(true));

  const data = await requestScan(id, base64Image, token!);

  if (data == null) {
    dispatch(setLoading(false));
    return dispatch(onSetErrorCode(ErrorTypes.internetConnectionRequired));
  }

  const mappedData: IScanResult = {
    id: image.id,
    image: {...image},
    data,
  };

  const action: IOnNewPetPassScanResult = {
    type: ON_NEW_PET_PASS_SCAN_RESULT,
    data: mappedData,
  };

  dispatch(action);

  dispatch(onShowScanResult(image, data));

  dispatch(setLoading(false));

  if (data.suggestions.de.length === 0 && data.suggestions.en.length === 0) {
    dispatch(onSetErrorCode(ErrorTypes.scanResultEmpty));
  }
};

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

export const onShowScanResult = (
  image: IImageDataDto | null,
  data: IScanDataDto,
) => (dispatch: any, getState: () => ICombinedReducerState) => {
  const state = getState();

  const {mainViewComponent} = state.navigation;

  const inputs = (Object.keys(data) as Array<keyof IScanDataDto>).reduce(
    (result, key) => {
      const d = data[key];
      (Object.keys(d) as LanguageTypes[]).forEach((lang) => {
        const match = d[lang];
        (match || []).forEach((p) => {
          result[p.id] = p.shortInfo;
        });
      });
      return result;
    },
    {} as {[key: string]: InputValues},
  );

  const subViewComponent = SubViewComponents.newScanResult;

  dispatch(onSetValuesFor(inputs, mainViewComponent, subViewComponent));

  dispatch(onSetDataForScanResult(image, data));

  dispatch(onChangeSubViewComponent(subViewComponent, state.layout.language));
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
  const {mainViewComponent, subViewComponent} = state.navigation;

  dispatch(onResetInputsFor(mainViewComponent, subViewComponent));
  dispatch(onGoBackNavigation(language));
  dispatch(onResetScanResult());
};

export type Actions =
  | IOnSetDataScanResult
  | IOnCreateNewScanEntity
  | IOnSelectScanEntity
  | IOnResetScanResult
  | IOnRemoveNewScanEntity
  | IOnNewPetPassScanResult;
