export const ON_SPLASH_ANIMATION_START = "ON_SPLASH_ANIMATION_START";

interface IOnSplashAnimationStart {
  type: typeof ON_SPLASH_ANIMATION_START;
}

export const onSplashAnimationStart = () => async (dispatch: any) => {
  dispatch({
    type: ON_SPLASH_ANIMATION_START,
  } as IOnSplashAnimationStart);
};

export type Actions = IOnSplashAnimationStart;
