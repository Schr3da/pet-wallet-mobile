import {Splash, Navigation, Database} from "../../actions";

export interface ISplashState {
  isAnimating: boolean;
}

const initialState = (): ISplashState => ({
  isAnimating: false,
});

const animationStart = (state: ISplashState): ISplashState => ({
  ...state,
  isAnimating: true,
});

const animationComplete = (state: ISplashState): ISplashState =>
  state.isAnimating === false
    ? state
    : {
        ...state,
        isAnimating: false,
      };

type Actions = Splash.Actions | Navigation.Actions | Database.Actions;

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Splash.ON_SPLASH_ANIMATION_START:
      return animationStart(state);
    case Navigation.ON_SHOW_HOME_COMPONENT:
      return animationComplete(state);
    case Database.ON_REQUEST_DATA_DELETION:
      return initialState();
    default:
      return state;
  }
};

export const splash = reducer;
