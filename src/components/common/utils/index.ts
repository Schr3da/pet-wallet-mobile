import {ImageSourcePropType} from "react-native";
import Animated, {Easing} from "react-native-reanimated";

import {IImageData} from "../../../store/actions/new-pet";

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

export const base64ImageString = (image: IImageData | null) => {
  if (image == null || image.fileType == null || image.imageBase64 == null) {
    return null;
  }

  return `data:image/${image.fileType};base64, ${image.imageBase64}`;
};

export const base64ImageToUri = (image: IImageData): ImageSourcePropType => ({
  uri: base64ImageString(image) as any,
});

export const collectionIsEmpty = <T>(
  collection: T | T[]
) => {
  const condition = (v: T) => v == null || String(v).trim().length === 0;

  return Array.isArray(collection) ? 
    (collection || []).length === 0 || collection.some(condition) :
    collection == null || Object.keys(collection).length === 0 || Object.values(collection).some(condition);
};

export const inputValueEmpty = <T>(value: T) => {
  if (value == null) {
    return true;
  }

  const stringified = String(value).trim();
  return stringified === "undefined" || stringified === "null" || stringified.length === 0;
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
