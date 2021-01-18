import {getTranslation, LanguageTypes} from "../../../language";
import {SubViewComponents, ViewComponents} from "../../actions/navigation";
import {Layout, Navigation, Splash, NewPet} from "../../actions";

export interface INavigationState {
  title: string;
  description: string;
  hasPets: boolean;
  mainViewComponent: Navigation.ViewComponents;
  subViewComponent: Navigation.SubViewComponents;
  previousPath: Array<Navigation.ViewComponents | Navigation.SubViewComponents>
  path: Array<Navigation.ViewComponents | Navigation.SubViewComponents>;
}

const initialState = (): INavigationState => ({
  title: "",
  description: "",
  hasPets: false,
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
  hasPets?: boolean,
): INavigationState => changeHeader({
  ...state,
  hasPets: hasPets == null ? state.hasPets : hasPets, 
  mainViewComponent: nextMainView,
  subViewComponent: nextSubView,
  previousPath: [...state.path],
  path: [nextMainView, nextSubView],
}, language);

const changeSubview = (
  state: INavigationState,
  next: Navigation.SubViewComponents,
  language: LanguageTypes,
): INavigationState => changeHeader({
  ...state,
  subViewComponent: next,
  previousPath: [...state.path],
  path: [...state.path, next],
}, language);

const goBack = (
  state: INavigationState,
  language: LanguageTypes,
): INavigationState => {
  const path = [...state.previousPath];
  const previousPath = path.slice(0, -1); 

  if (path.length <= 1) {
    const mainViewComponent = ViewComponents.welcome;
    const subViewComponent = state.hasPets ? SubViewComponents.welcomeWithPets : SubViewComponents.welcomeNoPets;

    return changeViews({...state,
      path: [],
      previousPath: []
    }, mainViewComponent, subViewComponent, language);
  }

  const mainViewComponent = path[0] as ViewComponents;
  const subViewComponent = path[path.length - 1] as SubViewComponents;

  return changeHeader({...state,
    mainViewComponent,
    subViewComponent,
    previousPath,
    path
  }, language);
}

export const showHome = (
  state: INavigationState,
  language: LanguageTypes,
  hasPets: boolean,
) => changeViews(state, 
  Navigation.ViewComponents.welcome,
  hasPets ? 
    Navigation.SubViewComponents.welcomeWithPets :
    Navigation.SubViewComponents.welcomeNoPets,
  language,
); 

type Actions = Layout.Actions | Navigation.Actions | Splash.Actions | NewPet.Actions;

export const reducer = (
  state: INavigationState = initialState(),
  action: Actions 
) => {
  switch (action.type) {
    case Layout.ON_CHANGE_LANGUAGE:
      return changeHeader(state, action.next);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return showHome(state, action.language, action.hasPets);
    case Navigation.ON_CHANGE_VIEW_COMPONENT:
      return changeViews(state, action.nextMainView, action.nextSubView, action.language); 
    case Navigation.ON_CHANGE_SUBVIEW_COMPONENT:
      return changeSubview(state, action.next, action.language);
    case Navigation.ON_GO_BACK_NAVIGATION:
      return goBack(state, action.language);
    case NewPet.ON_CANCEL_NEW_PET:
      return showHome(state, action.language, action.hasPets);
    default: 
      return state;
  }
};

export const navigation = reducer; 
