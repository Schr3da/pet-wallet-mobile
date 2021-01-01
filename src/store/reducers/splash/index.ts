import {Splash} from "../../actions";

export interface ISplashState {
  isAnimating: boolean;
}

const initialState = (): ISplashState => ({
  isAnimating: false,
});

type Actions = Splash.Actions;

const handleAnimationStart = (
  state: ISplashState, 
): ISplashState => ({
  ...state,
  isAnimating: true,
});

const handleAnimationComplete = (
  state: ISplashState, 
): ISplashState => ({
  ...state,
  isAnimating: false,
});

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Splash.ON_SPLASH_ANIMATION_START:
      return handleAnimationStart(state);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return handleAnimationComplete(state);
    default:
      return state;
  }
};

export const splash = reducer;
