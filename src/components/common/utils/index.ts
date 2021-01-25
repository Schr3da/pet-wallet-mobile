import {ImageSourcePropType, Platform} from "react-native";

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
