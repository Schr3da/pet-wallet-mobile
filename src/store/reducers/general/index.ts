import {LanguageTypes} from "../../../language";
import {General, Splash} from "../../actions";

export interface IGeneralState {
  currentViewComponent: General.ViewComponents;
  currentLanguage: LanguageTypes,
}

const initialState = (): IGeneralState => ({
  currentViewComponent: General.ViewComponents.splash,
  currentLanguage: LanguageTypes.de,
});

const handleChangeViewComponent = (
  state: IGeneralState,
  next: General.ViewComponents,
) =>
  state.currentViewComponent === next ? state : ({
    ...state,
    currentViewComponent: next,
  });

const handleChangeLanguage = (
  state: IGeneralState,
  next: LanguageTypes,
) =>
  state.currentLanguage=== next ? state : ({
    ...state,
    currentLanguage: next,
  });

type Actions = General.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case General.ON_CHANGE_LANGUAGE:
      return handleChangeLanguage(state, action.next);
    case General.ON_CHANGE_VIEW_COMPONENT:
      return handleChangeViewComponent(state, action.next); 
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return handleChangeViewComponent(state, General.ViewComponents.welcome); 
    default:
      return state;
  }
};

export const general = reducer;
