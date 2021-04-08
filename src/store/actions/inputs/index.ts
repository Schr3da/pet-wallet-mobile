import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {ICombinedReducerState} from "../../reducers";
import {InputValues} from "../../../enums/input";

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

export type Actions = IOnInputChange;
