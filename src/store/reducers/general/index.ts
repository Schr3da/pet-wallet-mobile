import {ThemeTypes} from "../../../theme";
import {getTranslation, LanguageTypes} from "../../../language";
import {General, Splash} from "../../actions";
import {ViewComponents} from "store/actions/general";

export interface IGeneralState {
  title: string;
  description: string;
  currentLanguage: LanguageTypes,
  currentTheme: ThemeTypes,
  currentViewComponent: General.ViewComponents;
}

const initialState = (): IGeneralState => ({
  title: "",
  description: "",
  currentLanguage: LanguageTypes.en,
  currentTheme: ThemeTypes.Light,
  currentViewComponent: General.ViewComponents.splash,
});

const changeViewComponent = (
  state: IGeneralState,
  next: General.ViewComponents,
) => {
  const nextState = {...state};
  nextState.currentViewComponent = next;
  return changeTitleAndDescription(nextState);
}

const changeTitleAndDescription = (
  state: IGeneralState
): IGeneralState => {
  const {currentLanguage, currentViewComponent} = state; 
  const translation = getTranslation(currentLanguage);

  let title = "";
  let description = "";

  switch (currentViewComponent) {
    case ViewComponents.splash:
      title = "";
      description = "";
    case ViewComponents.welcome:
      title = translation.welcome.noPets.title;
      description = translation.welcome.noPets.description;
      break;
    case ViewComponents.newPet:
      title = translation.newPet.petSelection.title;
      description = translation.newPet.petSelection.description;
      break;
    default: 
      title = "-";
      description = "-";
  }

  return {...state, 
    title, 
    description,
  };
}

const changeLanguage = (
  state: IGeneralState,
  next: LanguageTypes,
): IGeneralState => {
  let nextState = {...state};
  nextState.currentLanguage = next;
  return changeTitleAndDescription(nextState);
}

const changeTheme = (
  state: IGeneralState,
  next: ThemeTypes
) =>
  state.currentTheme === next ? state : ({
    ...state,
    currentTheme: next,
  });

type Actions = General.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case General.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case General.ON_CHANGE_VIEW_COMPONENT:
      return changeViewComponent(state, action.next); 
    case General.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return changeViewComponent(state, General.ViewComponents.welcome); 
    default:
      return state;
  }
};

export const general = reducer;
