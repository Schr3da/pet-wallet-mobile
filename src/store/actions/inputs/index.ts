import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {ICombinedReducerState} from "../../reducers";
import {InputValues} from "../../../enums/input";

export const ON_RESET_INPUTS_FOR = "ON_RESET_INPUTS_FOR";
type ON_RESET_INPUTS_FOR = typeof ON_RESET_INPUTS_FOR;
interface IOnResetInputsFor {
  type: ON_RESET_INPUTS_FOR;
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
}

export const onResetInputsFor = (
  mainViewComponent: ViewComponents,
  subViewComponent: SubViewComponents,
): IOnResetInputsFor => ({
  type: ON_RESET_INPUTS_FOR,
  mainViewComponent,
  subViewComponent,
});

export const ON_SET_VALUES_FOR = "ON_SET_VALUES_FOR";
type ON_SET_VALUES_FOR = typeof ON_SET_VALUES_FOR;
interface IOnSetValuesFor {
  type: ON_SET_VALUES_FOR;
  data: {[key: string]: InputValues};
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
}

export const onSetValuesFor = (
  data: {[key: string]: InputValues},
  mainViewComponent: ViewComponents,
  subViewComponent: SubViewComponents,
) => ({
  type: ON_SET_VALUES_FOR,
  data,
  mainViewComponent,
  subViewComponent,
});

export const ON_INPUT_CHANGE = "ON_INPUT_CHANGE";
type ON_INPUT_CHANGE = typeof ON_INPUT_CHANGE;
interface IOnInputChange {
  type: ON_INPUT_CHANGE;
  id: string;
  value: InputValues;
  mainViewComponent: ViewComponents;
  subViewComponent: SubViewComponents;
}

export const onInputChange = (id: string, value: InputValues) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  const state = getState();

  const {mainViewComponent, subViewComponent} = state.navigation;

  const action: IOnInputChange = {
    type: ON_INPUT_CHANGE,
    id,
    value,
    mainViewComponent,
    subViewComponent,
  };

  dispatch(action);
};

export type Actions = IOnInputChange | IOnSetValuesFor | IOnResetInputsFor;
