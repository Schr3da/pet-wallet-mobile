import {Inputs, Navigation} from "../../actions";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {InputValues} from "../../actions/scan-result";

export interface IInputState {
  [mainView: string]: {
    [subView: string]: {
      [id: string]: InputValues;
    };
  };
}

const initialState = () => {
  return {};
};

const handleInputChange = (
  state: IInputState,
  mainView: ViewComponents,
  subView: SubViewComponents,
  id: string,
  value: InputValues,
): IInputState => {
  if (state[mainView] == null) {
    state[mainView] = {};
  }

  if (state[mainView][subView] == null) {
    state[mainView][subView] = {};
  }

  return {
    ...state,
    [mainView]: {
      ...state[mainView],
      [subView]: {
        ...state[mainView][subView],
        [id]: value,
      },
    },
  };
};

type Actions = Inputs.Actions | Navigation.Actions;

const reducer = (state: IInputState = initialState(), action: Actions) => {
  switch (action.type) {
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return initialState();
    case Inputs.ON_INPUT_CHANGE:
      return handleInputChange(
        state,
        action.mainViewComponent,
        action.subViewComponent,
        action.id,
        action.value,
      );
    default:
      return state;
  }
};

export const inputs = reducer;
