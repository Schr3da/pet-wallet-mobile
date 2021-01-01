import {ThemeTypes} from "../../../theme";
import {Theme} from "../../actions";

export interface IThemeState {
  current: ThemeTypes,
};

const initalState = () => ({
  current: ThemeTypes.Light,
});

type Actions = Theme.Actions;

const changeCurrentTheme = (state: IThemeState, next: ThemeTypes) =>
  state.current === next ? state : ({
    ...state,
    current: next,
  });

const reducer = (
  state: IThemeState = initalState(),
  action: Actions
) => {
  switch (action.type) {
    case Theme.ON_CHANGE_CURRENT_THEME:
      return changeCurrentTheme(state, action.next);
    default: 
      return state;
  }
}

export const theme = reducer;
