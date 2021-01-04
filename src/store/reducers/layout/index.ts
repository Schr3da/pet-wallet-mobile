import {ThemeTypes} from "../../../theme";

import {getTranslation, LanguageTypes} from "../../../language";

import {Layout, Splash} from "../../actions";

export interface ILayoutState {
  title: string;
  description: string;
  language: LanguageTypes,
  theme: ThemeTypes,
  mainViewComponent: Layout.ViewComponents;
  subViewComponent: Layout.SubViewComponents;
  navigation: string[];
}

const initialState = (): ILayoutState => ({
  title: "",
  description: "",
  language: LanguageTypes.de,
  theme: ThemeTypes.Light,
  mainViewComponent: Layout.ViewComponents.splash,
  subViewComponent: Layout.SubViewComponents.none, 
  navigation: [],
});

const changeViewComponent = (
  state: ILayoutState,
  nextMainViewComponent: Layout.ViewComponents,
  nextSubViewComponent?: Layout.SubViewComponents,
): ILayoutState => {
  const nextState = {...state};
  nextState.mainViewComponent = nextMainViewComponent;
  nextState.subViewComponent = nextSubViewComponent || Layout.SubViewComponents.none;
  return changeHeader(nextState);
}

const changeHeader = (
  state: ILayoutState
): ILayoutState => {
  const {language, mainViewComponent, subViewComponent} = state; 
  const {header} = getTranslation(language);

  if (header[mainViewComponent] == null && header[subViewComponent] == null) {
    return {...state,
      title: "",
      description: "",
    };
  }

  const {title, description} = header[mainViewComponent][subViewComponent]; 
  return {...state, 
    title, 
    description,
  };
}

const changeLanguage = (
  state: ILayoutState,
  next: LanguageTypes,
): ILayoutState => {
  let nextState = {...state};
  nextState.language = next;
  return changeHeader(nextState);
}

const changeTheme = (
  state: ILayoutState,
  next: ThemeTypes
): ILayoutState =>
  state.theme === next ? state : ({
    ...state,
    theme: next,
  });

type Actions = Layout.Actions | Splash.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Layout.ON_CHANGE_LANGUAGE:
      return changeLanguage(state, action.next);
    case Layout.ON_CHANGE_VIEW_COMPONENT:
      return changeViewComponent(state,
        action.nextMainView,
        action.nextSubView
      ); 
    case Layout.ON_CHANGE_CURRENT_THEME:
      return changeTheme(state, action.next);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return changeViewComponent(state, 
        Layout.ViewComponents.welcome,
        action.hasPets ? 
          Layout.SubViewComponents.welcomeWithPets :
          Layout.SubViewComponents.welcomeNoPets
      ); 
    default:
      return state;
  }
};

export const layout = reducer;
