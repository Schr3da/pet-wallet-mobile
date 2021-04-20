import {LanguageTypes} from "../../../language";
import {ICombinedReducerState} from "../../reducers";
import {onFetchPets} from "../pets";
import {ViewComponents, SubViewComponents} from "../../../enums/navigation";
import {setLoading} from "../layout";

export const ON_CHANGE_VIEW_COMPONENT = "ON_CHANGE_VIEW_COMPONENT";
interface IOnChangeViewComponent {
  type: typeof ON_CHANGE_VIEW_COMPONENT;
  nextMainView: ViewComponents;
  nextSubView: SubViewComponents;
  language: LanguageTypes;
}

export const onChangeViewComponent = (
  nextMainView: ViewComponents,
  nextSubView: SubViewComponents,
  language: LanguageTypes,
): IOnChangeViewComponent => ({
  type: ON_CHANGE_VIEW_COMPONENT,
  nextMainView,
  nextSubView,
  language,
});

export const ON_CHANGE_SUBVIEW_COMPONENT = "ON_CHANGE_SUBVIEW_COMPONENT";
interface IOnChangeSubViewComponent {
  type: typeof ON_CHANGE_SUBVIEW_COMPONENT;
  next: SubViewComponents;
  language: LanguageTypes;
}

export const onChangeSubViewComponent = (
  next: SubViewComponents,
  language: LanguageTypes,
): IOnChangeSubViewComponent => ({
  type: ON_CHANGE_SUBVIEW_COMPONENT,
  next,
  language,
});

export const ON_GO_BACK_NAVIGATION = "ON_GO_BACK_NAVIGATION";
interface IOnGoBackNavigation {
  type: typeof ON_GO_BACK_NAVIGATION;
  language: LanguageTypes;
}

export const onGoBackNavigation = (language: LanguageTypes) => (
  dispatch: any,
  getState: () => ICombinedReducerState,
) => {
  dispatch({
    type: ON_GO_BACK_NAVIGATION,
    language,
  } as IOnGoBackNavigation);

  const state = getState();
  if (state.navigation.mainViewComponent !== ViewComponents.welcome) {
    return;
  }

  onShowHomeComponent()(dispatch, getState);
};

export const ON_SHOW_HOME_COMPONENT = "ON_SHOW_HOME_COMPONENT";
interface IOnShowHomeComponent {
  type: typeof ON_SHOW_HOME_COMPONENT;
  language: LanguageTypes;
  hasPets: boolean;
}

export const onShowHomeComponent = (didFinish: boolean = true) => async (
  dispatch: any,
  getState: () => ICombinedReducerState,
): Promise<void> => {
  dispatch(setLoading(true));

  await onFetchPets()(dispatch, getState);

  const state = getState();

  dispatch({
    type: ON_SHOW_HOME_COMPONENT,
    language: state.layout.language,
    hasPets: state.navigation.hasPets,
  });

  if (didFinish == false) {
    return;
  }

  dispatch(setLoading(false));
};

export type Actions =
  | IOnGoBackNavigation
  | IOnChangeViewComponent
  | IOnChangeSubViewComponent
  | IOnShowHomeComponent;
