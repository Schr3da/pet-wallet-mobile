import {ImageSourcePropType} from "react-native";
import Animated, {Easing} from "react-native-reanimated";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

import {IImageDataDto} from "../../../dto/image";
import {ScanErrorTypes, ImagePickerTypes} from "../../../enums/image";
import {ICombinedReducerState} from "../../../store/reducers";
import {IInputState} from "../../../store/reducers/inputs";
import {SubViewComponents, ViewComponents} from "../../../enums/navigation";
import {InputValues} from "../../../enums/input";

export interface IMeasureResult {
  width: number;
  height: number;
  x: number;
  y: number;
  absoluteX: number;
  absoluteY: number;
}

export const measureComponent = (ref: any): Promise<IMeasureResult | null> =>
  new Promise((resolve) => {
    if (ref == null || ref.current == null) {
      return resolve(null);
    }

    ref.current.measure(
      (
        x: number,
        y: number,
        width: number,
        height: number,
        absoluteX: number,
        absoluteY: number,
      ) => resolve({x, y, width, height, absoluteX, absoluteY}),
    );
  });

export const base64ImageString = (image: IImageDataDto | null) => {
  if (image == null || image.fileType == null || image.imageBase64 == null) {
    return null;
  }

  return `data:${image.fileType};${image.imageBase64}`;
};

export const base64ImageToUri = (
  image: IImageDataDto | null,
): ImageSourcePropType => ({
  uri: base64ImageString(image) as any,
});

export const collectionIsEmpty = <T>(collection: T | T[]) => {
  const condition = (v: T) => v == null || String(v).trim().length === 0;

  return Array.isArray(collection)
    ? (collection || []).length === 0 || collection.some(condition)
    : collection == null ||
        Object.keys(collection).length === 0 ||
        Object.values(collection).some(condition);
};

export const inputValueEmpty = <T>(value: T): boolean => {
  if (value == null) {
    return true;
  }

  const stringified = String(value).trim();
  return (
    stringified === "undefined" ||
    stringified === "null" ||
    stringified.length === 0
  );
};

export const createNotificationAnimation = (
  current: Animated.Value<number>,
  toValue: number,
) =>
  Animated.timing(current, {
    toValue,
    duration: 500,
    easing: Easing.linear,
  });

export const isDev = (): boolean => true;

export const createUuid = () => {
  let dt = new Date().getTime();
  const uuid = "xxxx-xxxx-xxxx-xxxx-xxxx".replace(/[xy]/g, (character) => {
    const r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 16);
    return (character == "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
  return uuid;
};

export const hasScanError = (code: string): boolean =>
  ScanErrorTypes.permission === code ||
  ScanErrorTypes.unavailable === code ||
  ScanErrorTypes.others === code;

export const prepareImageInput = (
  type: ImagePickerTypes,
  maxWidth: number,
  maxHeight: number,
) =>
  new Promise<IImageDataDto | null>((resolve) => {
    const options = {
      includeBase64: true,
      mediaType: "photo",
      maxWidth,
      maxHeight,
      quality: 0,
    };

    if (type === ImagePickerTypes.camera) {
      return launchCamera(options, (data: any) =>
        hasScanError(data) === true
          ? resolve(null)
          : resolve({
              id: Date.now().toString(),
              uri: data.uri,
              imageBase64: data.base64,
              fileSize: data.fileSize,
              width: data.width,
              height: data.height,
              fileType: data.type,
              didCancel: data.didCancel,
            }),
      );
    }

    if (type === ImagePickerTypes.picker) {
      return launchImageLibrary(options, (data: any) => {
        hasScanError(data) === true
          ? resolve(null)
          : resolve({
              id: Date.now().toString(),
              uri: data.uri,
              imageBase64: data.base64,
              fileSize: data.fileSize,
              width: data.width,
              height: data.height,
              fileType: data.type,
              didCancel: data.didCancel,
            });
      });
    }
  });

export const getInputData = <T>(state: ICombinedReducerState): T => {
  const {mainViewComponent, subViewComponent} = state.navigation;
  const inputs = state.inputs;

  if (inputs[mainViewComponent] == null) {
    return {} as any;
  }

  if (inputs[mainViewComponent][subViewComponent] == null) {
    return {} as any;
  }

  return inputs[mainViewComponent][subViewComponent] as any;
};

export const getInputValue = (
  inputs: IInputState,
  key: string,
  mainViewComponent: ViewComponents,
  subViewComponent: SubViewComponents,
): null | InputValues => {
  if (inputs[mainViewComponent] == null) {
    return null;
  }

  if (inputs[mainViewComponent][subViewComponent] == null) {
    return null;
  }

  return inputs[mainViewComponent][subViewComponent][key];
};
