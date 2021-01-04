import {getTranslation, LanguageTypes} from "language";
import {SubViewComponents, ViewComponents} from "store/actions/navigation";

import {Layout, Navigation, Splash} from "../../actions";

export interface INavigationState {
  title: string;
  description: string;
  mainViewComponent: Navigation.ViewComponents;
  subViewComponent: Navigation.SubViewComponents;
  previousPath: Array<Navigation.ViewComponents | Navigation.SubViewComponents>
  path: Array<Navigation.ViewComponents | Navigation.SubViewComponents>;
}

const initialState = (): INavigationState => ({
  title: "",
  description: "",
  mainViewComponent: Navigation.ViewComponents.splash,
  subViewComponent: Navigation.SubViewComponents.none,
  previousPath: [], 
  path: [],
});

const changeHeader = (
  state: INavigationState,
  language: LanguageTypes
): INavigationState => {
  const {mainViewComponent, subViewComponent} = state; 
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

const changeViews = (
  state: INavigationState,
  nextMainView: Navigation.ViewComponents,
  nextSubView: Navigation.SubViewComponents,
  language: LanguageTypes,
): INavigationState => changeHeader({
  ...state,
  mainViewComponent: nextMainView,
  subViewComponent: nextSubView,
  previousPath: [...state.path],
  path: [nextMainView, nextSubView],
}, language);

const changeSubview = (
  state: INavigationState,
  next: Navigation.SubViewComponents,
  language: LanguageTypes,
): INavigationState => changeViews(
  state, 
  state.mainViewComponent,
  next,
  language
);

const goBack = (
  state: INavigationState,
  language: LanguageTypes,
): INavigationState => {
  const previousPath = [...state.previousPath];
  const newPreviousPath = previousPath.slice(0, -1); 

  const mainViewComponent = previousPath.length === 0 ? 
    ViewComponents.welcome : previousPath[0] as ViewComponents;

  const subViewComponent = previousPath.length > 1 ? 
    SubViewComponents.welcomeNoPets : previousPath[previousPath.length - 1] as SubViewComponents;

  return changeHeader({...state,
    mainViewComponent,
    subViewComponent,
    previousPath: newPreviousPath,
    path: previousPath,
  }, language);
}

type Actions = Layout.Actions | Navigation.Actions | Splash.Actions;

export const reducer = (
  state: INavigationState = initialState(),
  action: Actions 
) => {
  switch (action.type) {
    case Layout.ON_CHANGE_LANGUAGE:
      return changeHeader(state, action.next);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return changeViews(state, 
        Navigation.ViewComponents.welcome,
        action.hasPets ? 
          Navigation.SubViewComponents.welcomeWithPets :
          Navigation.SubViewComponents.welcomeNoPets,
        action.language,
      ); 
    case Navigation.ON_CHANGE_VIEW_COMPONENT:
      return changeViews(state, action.nextMainView, action.nextSubView, action.language); 
    case Navigation.ON_CHANGE_SUBVIEW_COMPONENT:
      return changeSubview(state, action.next, action.language);
    case Navigation.ON_GO_BACK_NAVIGATION:
      return goBack(state, action.language);
    default: 
      return state;
  }
}

export const navigation = reducer; 
