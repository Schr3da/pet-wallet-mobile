import {IFilterDataDto} from "../../../dto/filters";
import {FilterTypes} from "../../../enums/filters";
import {LanguageTypes, getTranslation} from "../../../language";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {ICombinedReducerState} from "../../reducers";

export const getPetDetailsFilters = (
  language: LanguageTypes,
): IFilterDataDto[] => {
  const {filters} = getTranslation(language);

  return [
    {
      id: FilterTypes.generalOnly,
      label: filters.petDetails.none.generalOnlyFilter,
      isSelected: true,
    },
    {
      id: FilterTypes.medicalOnly,
      label: filters.petDetails.none.medicalOnlyFilter,
      isSelected: false,
    },
  ];
};

export const ON_CHANGE_FILTER = "ON_CHANGE_FILTER";
type ON_CHANGE_FILTER = typeof ON_CHANGE_FILTER;
interface IOnChangeFilter {
  type: ON_CHANGE_FILTER;
  id: string;
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
}

export const handleChangeFilter = (id: string) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const {mainViewComponent, subViewComponent} = state.navigation;

  const action: IOnChangeFilter = {
    type: ON_CHANGE_FILTER,
    id,
    mainViewComponent,
    subViewComponent,
  };

  dispatch(action);
};

export type Actions = IOnChangeFilter;
