import { isOnline, setDeviceOnline } from "../layout";

export const ON_SPLASH_ANIMATION_START = "ON_SPLASH_ANIMATION_START";

interface IOnSplashAnimationStart {
  type: typeof ON_SPLASH_ANIMATION_START;
}

export const onSplashAnimationStart = () => async (
  dispatch: any
) => {
  const isConnected = await isOnline(); 
  dispatch(setDeviceOnline(isConnected));

  dispatch({
    type: ON_SPLASH_ANIMATION_START,
  } as IOnSplashAnimationStart);
};

export type Actions = IOnSplashAnimationStart;
