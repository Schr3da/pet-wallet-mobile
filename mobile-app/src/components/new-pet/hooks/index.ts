import {LanguageTypes} from "../../../language";
import {SubViewComponents} from "../../../enums/navigation";
import {onChangeSubViewComponent} from "../../../store/actions/navigation";
import {DialogContentTypes, ErrorTypes} from "../../../enums/layout";
import {InputValues} from "../../../enums/input";
import {onInputChange} from "../../../store/actions/inputs";

import {
  onSetErrorCode,
  onSetDialogContentType,
} from "../../../store/actions/layout";

export const handleInputChange = (
  id: string,
  value: InputValues,
  dispatch: any,
) => dispatch(onInputChange(id, value));

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

export const requestSkip = (dispatch: any) =>
  dispatch(onSetDialogContentType(DialogContentTypes.skip));

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));
