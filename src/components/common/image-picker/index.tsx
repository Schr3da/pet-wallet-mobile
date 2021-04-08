import * as React from "react";

import {View, ViewStyle} from "react-native";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImageButton} from "../image-button";
import {applyStyles} from "./index.style";
import {ErrorTypes} from "../../../enums/layout";
import {IImageDataDto} from "../../../dto/image";
import {ImagePickerTypes} from "../../../enums/image";
import {prepareImageInput} from "../utils";

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
          setType(ImagePickerTypes.camera);

          const data = await prepareImageInput(
            ImagePickerTypes.camera,
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
          setType(ImagePickerTypes.picker);

          const data = await prepareImageInput(
            ImagePickerTypes.picker,
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
