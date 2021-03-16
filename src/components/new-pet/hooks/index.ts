import {InputValues, onInputFieldChange} from "../../../store/actions/new-pet";
import {
  onSetErrorCode,
  onSetDialogContentType,
} from "../../../store/actions/layout";
import {LanguageTypes} from "../../../language";
import {SubViewComponents} from "../../../enums/navigation";
import {onChangeSubViewComponent} from "../../../store/actions/navigation";
import {DialogContentTypes, ErrorTypes} from "../../../enums/layout";

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

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));
