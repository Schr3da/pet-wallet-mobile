export const ON_SPLASH_ANIMATION_START = "ON_SPLASH_ANIMATION_START";

interface IOnSplashAnimationStart {
  type: typeof ON_SPLASH_ANIMATION_START;
}

export const onSplashAnimationStart = (): IOnSplashAnimationStart => ({
  type: ON_SPLASH_ANIMATION_START,
});

export const ON_SPLASH_ANIMATION_COMPLETE = "ON_SPLASH_ANIMATION_COMPLETE";

interface IOnSplashAnimationComplete {
  type: typeof ON_SPLASH_ANIMATION_COMPLETE; 
  hasPets: boolean;
}

export const onSplashAnimationComplete = (hasPets: boolean): IOnSplashAnimationComplete => ({
  type: ON_SPLASH_ANIMATION_COMPLETE,
  hasPets,
});

export type Actions = 
  | IOnSplashAnimationStart
  | IOnSplashAnimationComplete
;
