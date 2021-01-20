export const ON_SPLASH_ANIMATION_START = "ON_SPLASH_ANIMATION_START";

interface IOnSplashAnimationStart {
  type: typeof ON_SPLASH_ANIMATION_START;
}

export const onSplashAnimationStart = (): IOnSplashAnimationStart => ({
  type: ON_SPLASH_ANIMATION_START,
});

export type Actions = 
  | IOnSplashAnimationStart
;
