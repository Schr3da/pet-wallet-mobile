export const ON_SPLASH_ANIMATION_START = "ON_SPLASH_ANIMATION_START";

interface IOnSplashAnimationStart {
  type: typeof ON_SPLASH_ANIMATION_START;
  duration: number;
}

export const onSplashAnimationStart = (): IOnSplashAnimationStart => ({
  type: ON_SPLASH_ANIMATION_START,
  duration: 5000, 
});

export const ON_SPLASH_ANIMATION_COMPLETE = "ON_SPLASH_ANIMATION_COMPLETE";

interface IOnSplashAnimationComplete {
  type: typeof ON_SPLASH_ANIMATION_COMPLETE; 
}

export const onSplashAnimationComplete = (): IOnSplashAnimationComplete => ({
  type: ON_SPLASH_ANIMATION_COMPLETE,
});

export type Actions = 
  | IOnSplashAnimationStart
  | IOnSplashAnimationComplete
;
