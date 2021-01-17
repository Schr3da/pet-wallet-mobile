import {InputValues, onInputFieldChange, onCancelNewPet} from "../../../store/actions/new-pet";
import {LanguageTypes} from "../../../language";
import {onChangeSubViewComponent, SubViewComponents} from "../../../store/actions/navigation";

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

export const handleCancelNewPet = (
  dispatch: any,
  language: LanguageTypes,
  hasPets: boolean,
) => dispatch(onCancelNewPet(language, hasPets));
