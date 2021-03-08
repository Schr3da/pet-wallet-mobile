import {
  InputValues,
  onInputFieldChange,
  onCancelNewPet,
} from "../../../store/actions/new-pet";
import {
  onChangeSubViewComponent,
  SubViewComponents,
} from "../../../store/actions/navigation";
import {
  onSetErrorCode,
  ErrorTypes,
  onSetDialogContentType,
  DialogContentTypes,
  onDismissDialog,
  setLoading,
} from "../../../store/actions/layout";
import {LanguageTypes} from "../../../language";

export const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => dispatch(onInputFieldChange(id, value));

export const handleChangeSubView = (
  dispatch: any,
  subview: SubViewComponents,
  language: LanguageTypes,
) => dispatch(onChangeSubViewComponent(subview, language));

export const handleChangeComponentView = (
  dispatch: any,
  subview: SubViewComponents,
  language: LanguageTypes,
) => dispatch(onChangeSubViewComponent(subview, language));

export const requestCancel = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.cancelNewPet));

export const handleCancelNewPet = (
  dispatch: any,
  language: LanguageTypes,
  hasPets: boolean,
) => {
  dispatch(onDismissDialog());
  dispatch(onCancelNewPet(language, hasPets));
};

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));
