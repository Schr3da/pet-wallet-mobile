import type {IFilterDataDto} from "../../../dto/filters";

import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {getPetDetailsFilters} from "../../actions/filters";
import {LanguageTypes, getTranslation} from "../../../language";
import {Layout, Database, Filters} from "../../actions";

export interface IFiltersState {
  [key: string]: {
    [key: string]: IFilterDataDto[];
  };
}

const initialState = () => {
  return {
    [ViewComponents.petDetails]: {
      [SubViewComponents.none]: getPetDetailsFilters(LanguageTypes.en),
    },
  };
};

const changeLanguage = (
  state: IFiltersState,
  language: LanguageTypes,
): IFiltersState => {
  const translation = getTranslation(language);

  return Object.keys(state).reduce(
    (next: any, key: any) => {
      const mainComponent = {...next[key]};

      return {
        ...next,
        [key]: Object.keys(mainComponent).reduce(
          (childResult: any, childKey: any) => {
            const subComponent = [...childResult[childKey]] as IFilterDataDto[];

            childResult[childKey] = subComponent.map((s) => ({
              ...s,
              label: (translation.filters as any)[key][childKey][s.id],
            }));

            return {...childResult};
          },
          {...mainComponent},
        ),
      };
    },
    {...state},
  );
};

const changeSelection = (
  state: IFiltersState,
  id: string,
  mainViewComponent: ViewComponents,
  subViewComponent: SubViewComponents,
): IFiltersState => ({
  ...state,
  [mainViewComponent]: {
    ...state[mainViewComponent],
    [subViewComponent]: state[mainViewComponent][subViewComponent].map(
      (filter) => ({
        ...filter,
        isSelected: filter.id === id,
      }),
    ),
  },
});

type Actions = Filters.Actions | Layout.Actions | Database.Actions;

const reducer = (state: IFiltersState = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Database.ON_INIT_DATA_FROM_DATABASE:
      return changeLanguage(state, action.settings.language);
    case Filters.ON_CHANGE_FILTER:
      return changeSelection(
        state,
        action.id,
        action.mainViewComponent,
        action.subViewComponent,
      );
    default:
      return state;
  }
};

export const filters = reducer;
