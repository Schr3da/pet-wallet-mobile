import {General, Splash} from "../../actions";

export interface IGeneralState {
  currentViewComponent: General.ViewComponents;
}

const initialState = (): IGeneralState => ({
  currentViewComponent: General.ViewComponents.splash,
});

const handleChangeViewComponent = (
  state: IGeneralState,
  next: General.ViewComponents,
) =>
  state.currentViewComponent === next ? state : ({
    ...state,
    currentViewComponent: next,
  });

type Actions = General.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case General.ON_CHANGE_VIEW_COMPONENT:
      return handleChangeViewComponent(state, action.next); 
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return handleChangeViewComponent(state, General.ViewComponents.welcome); 
    default:
      return state;
  }
};

export const general = reducer;
