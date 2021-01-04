import {ThemeTypes} from "../../../theme";

import {getTranslation, LanguageTypes} from "../../../language";

import {General, Splash} from "../../actions";
import {SubViewComponents} from "store/actions/general";

export interface IGeneralState {
  title: string;
  description: string;
  language: LanguageTypes,
  theme: ThemeTypes,
  mainViewComponent: General.ViewComponents;
  subViewComponent: General.SubViewComponents;
}

const initialState = (): IGeneralState => ({
  title: "",
  description: "",
  language: LanguageTypes.de,
  theme: ThemeTypes.Light,
  mainViewComponent: General.ViewComponents.splash,
  subViewComponent: General.SubViewComponents.none, 
});

const changeViewComponent = (
  state: IGeneralState,
  nextMainViewComponent: General.ViewComponents,
  nextSubViewComponent?: General.SubViewComponents,
) => {
  const nextState = {...state};
  nextState.mainViewComponent = nextMainViewComponent;
  nextState.subViewComponent = nextSubViewComponent || SubViewComponents.none;
  return changeTitleAndDescription(nextState);
}

const changeTitleAndDescription = (
  state: IGeneralState
): IGeneralState => {
  const {language: currentLanguage, mainViewComponent} = state; 
  const translation = getTranslation(currentLanguage);

  let title = "";
  let description = "";

  switch (mainViewComponent) {
    case General.ViewComponents.splash:
      title = "";
      description = "";
    case General.ViewComponents.welcome:
      title = translation.welcome.noPets.title;
      description = translation.welcome.noPets.description;
      break;
    case General.ViewComponents.newPet:
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
  nextState.language = next;
  return changeTitleAndDescription(nextState);
}

const changeTheme = (
  state: IGeneralState,
  next: ThemeTypes
) =>
  state.theme === next ? state : ({
    ...state,
    currentTheme: next,
  });

type Actions = General.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case General.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case General.ON_CHANGE_VIEW_COMPONENT:
      return changeViewComponent(state, action.nextMainView, action.nextSubView); 
    case General.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return changeViewComponent(state, General.ViewComponents.welcome); 
    default:
      return state;
  }
};

export const general = reducer;
