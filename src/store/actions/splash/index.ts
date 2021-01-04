import {LanguageTypes} from "../../../language";

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
  language: LanguageTypes;
}

export const onSplashAnimationComplete = (
  hasPets: boolean,
  language: LanguageTypes
): IOnSplashAnimationComplete => ({
  type: ON_SPLASH_ANIMATION_COMPLETE,
  hasPets,
  language,
});

export type Actions = 
  | IOnSplashAnimationStart
  | IOnSplashAnimationComplete
;
