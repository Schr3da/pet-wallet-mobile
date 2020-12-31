import {Splash} from "../../actions";

export interface ISplashState {
  isAnimating: boolean;
  duration: number;
}

const initialState = (): ISplashState => ({
  isAnimating: false,
  duration: 0,
});

type Actions = Splash.Actions;

const handleAnimationStart = (
  state: ISplashState, 
  duration: number
): ISplashState => ({
  ...state,
  isAnimating: true,
  duration,
});

const handleAnimationComplete = (
  state: ISplashState, 
): ISplashState => ({
  ...state,
  isAnimating: false,
  duration: 0,
});

const reducer = (state = initialState(), action: Actions) => {
  switch (action.type) {
    case Splash.ON_SPLASH_ANIMATION_START:
      return handleAnimationStart(state, action.duration);
    case Splash.ON_SPLASH_ANIMATION_COMPLETE:
      return handleAnimationComplete(state);
    default:
      return state;
  }
};

export const splash = reducer;
