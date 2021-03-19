import * as React from "react";

import {View, ViewStyle} from "react-native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImageButton} from "../image-button";

import {applyStyles} from "./index.style";
import {ErrorTypes} from "../../../enums/layout";
import {IImageDataDto} from "../../../dto/image";

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
  new Promise<IImageDataDto | null>((resolve) => {
    setState(type);

    const options = {
      includeBase64: true,
      mediaType: "photo",
      maxWidth,
      maxHeight,
      quality: 0,
    };

    if (type === ImagePickerTypes.camera) {
      return launchCamera(options, (data: any) =>
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
      return launchImageLibrary(options, (data: any) => {
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
  maxWidth: number;
  maxHeight: number;
  style?: ViewStyle;
  onData: (data: IImageDataDto) => void;
  onError: (type: ErrorTypes) => void;
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
            return onError(ErrorTypes.camera);
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
            return onError(ErrorTypes.photoLibrary);
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
