import * as React from "react";

import {View, ViewStyle} from "react-native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

import type {IImageData} from "../../../store/actions/new-pet";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImageButton} from "../image-button";

import {applyStyles} from "./index.style";

enum ImagePickerTypes {
  camera,
  picker,
}

export enum ScanErrorTypes {
  unavailable = "camera_unavailable",
  permission = "permission",
  others = "others",
}

const handlePress = (
  type: ImagePickerTypes,
  setState: (type: ImagePickerTypes) => void,
  maxWidth: number,
  maxHeight: number,
) =>
  new Promise<IImageData | null>((resolve) => {
    setState(type);

    const options = {
      includeBase64: true,
      mediaType: "photo",
      maxWidth,
      maxHeight,
    };

    if (type === ImagePickerTypes.camera) {
      return launchCamera(options, async (data: any) =>
        hasError(data) === true
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
      return launchImageLibrary(options, async (data: any) => {
        hasError(data) === true
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

const hasError = (code: string): boolean =>
  ScanErrorTypes.permission === code ||
  ScanErrorTypes.unavailable === code ||
  ScanErrorTypes.others === code;

const isSelected = (type: ImagePickerTypes, condition: ImagePickerTypes) =>
  type === condition;

interface IProps {
  theme: ThemeTypes;
  style?: ViewStyle;
  maxWidth: number;
  maxHeight: number;
  onData: (data: IImageData) => void;
  onError: () => void;
}

export const ImagePicker = (props: IProps): JSX.Element => {
  const [currentType, setType] = React.useState(ImagePickerTypes.camera);

  const {maxWidth, maxHeight, theme, onData, onError} = props;
  const style = props.style || {};

  const styles = createStyle(theme, applyStyles);

  const isCameraSelected = isSelected(ImagePickerTypes.camera, currentType);
  const isPickerSelected = isSelected(ImagePickerTypes.picker, currentType);

  return (
    <View style={{...styles.container, ...style}}>
      <ImageButton
        source={
          theme === ThemeTypes.Light
            ? isCameraSelected
              ? require("../../../../assets/png/light/camera-button-selected-icon.png")
              : require("../../../../assets/png/light/camera-button-icon.png")
            : isCameraSelected
            ? require("../../../../assets/png/dark/camera-button-selected-icon.png")
            : require("../../../../assets/png/dark/camera-button-icon.png")
        }
        style={styles.image(isCameraSelected)}
        onPress={async () => {
          const data = await handlePress(
            ImagePickerTypes.camera,
            setType,
            maxWidth,
            maxHeight,
          );
          if (data == null) {
            return onError();
          }

          if (data.didCancel === true) {
            return;
          }

          onData(data);
        }}
      />
      <ImageButton
        source={
          theme === ThemeTypes.Light
            ? isPickerSelected
              ? require("../../../../assets/png/light/image-gallery-button-selected-icon.png")
              : require("../../../../assets/png/light/image-gallery-button-icon.png")
            : isPickerSelected
            ? require("../../../../assets/png/dark/image-gallery-button-selected-icon.png")
            : require("../../../../assets/png/dark/image-gallery-button-icon.png")
        }
        style={styles.image(isPickerSelected)}
        onPress={async () => {
          const data = await handlePress(
            ImagePickerTypes.picker,
            setType,
            maxWidth,
            maxHeight,
          );
          if (data == null) {
            return onError();
          }

          if (data.didCancel === true) {
            return;
          }

          onData(data);
        }}
      />
    </View>
  );
};
