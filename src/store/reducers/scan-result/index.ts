import {ScanResult, Navigation} from "../../actions";
import {LanguageTypes} from "../../../language";
import {createUuid} from "../../../components/common/utils";
import {IScanDataDto} from "../../../dto/scan";
import {IImageDataDto} from "../../../dto/image";

export interface IScanResultState {
  result: IScanDataDto | null;
  image: IImageDataDto | null;
}

const initialState = (): IScanResultState => ({
  image: null,
  result: null,
});

const handleInputChange = (
  state: IScanResultState,
  id: string,
  value: any,
): IScanResultState => {
  if (state.result == null) {
    return state;
  }

  const data = {...state.result.prefills};

  Object.values(LanguageTypes).forEach((lang) => {
    const match = data[lang].find((p) => p.id === id);
    if (match == null) {
      return;
    }
    match.shortInfo = value;
  });

  return {
    ...state,
    result: {...state.result},
  };
};

const handleNewScanEntity = (state: IScanResultState): IScanResultState => {
  if (state.result == null) {
    return state;
  }

  const result = {...state.result};

  const emptyEntity = {
    id: createUuid(),
    shortInfo: "",
    longInfo: "",
    url: "",
    isSelected: true,
  };

  Object.values(LanguageTypes).forEach((lang) => {
    result.prefills[lang].push({...emptyEntity, language: lang});
  });

  return {...state, result};
};

const handleToggleSelection = (
  state: IScanResultState,
  id: string,
): IScanResultState => {
  if (state.result == null) {
    return state;
  }

  const result = {...state.result};

  Object.values(LanguageTypes).forEach((lang) => {
    const match = result.prefills[lang].find((p) => p.id === id);
    if (match == null) {
      return;
    }
    match.isSelected = !match.isSelected;
  });

  return {...state, result};
};

const setData = (
  state: IScanResultState,
  imageData: IImageDataDto | null,
  data: IScanDataDto | null,
): IScanResultState => {
  const image = imageData == null ? null : {...imageData};

  const result = data == null ? null : {...data};

  if (result != null) {
    result.prefills = {...result.prefills};
    Object.values(LanguageTypes).forEach((lang) => {
      result.prefills[lang] = result.prefills[lang].map((p) => ({...p}));
    });
  }

  return {
    ...state,
    image,
    result,
  };
};

const handleRemoveScanEntity = (
  state: IScanResultState,
  id: string,
): IScanResultState => {
  if (state.result == null) {
    return state;
  }

  const result = {...state.result};

  if (result != null) {
    result.prefills = {...result.prefills};
    Object.values(LanguageTypes).forEach((lang) => {
      result.prefills[lang] = result.prefills[lang].filter((p) => p.id !== id);
    });
  }

  return {
    ...state,
    result,
  };
};

type Actions = ScanResult.Actions | Navigation.Actions;

const reducer = (state: IScanResultState = initialState(), action: Actions) => {
  switch (action.type) {
    case ScanResult.ON_INPUT_FIELD_CHANGE_SCAN_RESULT:
      return handleInputChange(state, action.id, action.value);
    case ScanResult.ON_SET_DATA_FOR_SCAN_RESULT:
      return setData(state, action.image, action.data);
    case ScanResult.ON_CREATE_NEW_SCAN_ENTITY:
      return handleNewScanEntity(state);
    case ScanResult.ON_TOGGLE_SELECTION_SCAN_ENTITY:
      return handleToggleSelection(state, action.id);
    case ScanResult.ON_REMOVE_NEW_SCAN_ENTITY:
      return handleRemoveScanEntity(state, action.id);
    case ScanResult.ON_RESET_SCAN_RESULT:
      return initialState();
    default:
      return state;
  }
};

export const scan = reducer;
