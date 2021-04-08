import {Inputs, Navigation, ScanResult} from "../../actions";
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

const handleSetValuesFor = (
  state: IInputState,
  data: {[key: string]: InputValues},
  mainView: ViewComponents,
  subView: SubViewComponents,
) => {
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
        ...data,
      },
    },
  };
};

const handleResetFor = (
  state: IInputState,
  mainView: ViewComponents,
  subView: SubViewComponents,
) => {
  if (state[mainView] == null) {
    return state;
  }

  if (state[mainView][subView] == null) {
    return state;
  }

  return {
    ...state,
    [mainView]: {
      ...state[mainView],
      [subView]: null,
    },
  };
};

type Actions = Inputs.Actions | Navigation.Actions | ScanResult.Actions;

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
    case Inputs.ON_SET_VALUES_FOR:
      return handleSetValuesFor(
        state,
        action.data,
        action.mainViewComponent,
        action.subViewComponent,
      );
    case Inputs.ON_RESET_INPUTS_FOR:
      return handleResetFor(
        state,
        action.mainViewComponent,
        action.subViewComponent,
      );
    default:
      return state;
  }
};

export const inputs = reducer;
