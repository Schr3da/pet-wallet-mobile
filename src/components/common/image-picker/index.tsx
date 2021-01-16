import * as React from "react";

import {View, ViewStyle} from "react-native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";

import {createStyle, ThemeTypes} from "../../../theme";
import {ImageButton} from "../image-button";

import {applyStyles} from "./index.style";

enum ImagePickerTypes {
  camera,
  picker,
}

interface IProps {
  theme: ThemeTypes;
  style?: ViewStyle;
}

const handlePress = (
  type: ImagePickerTypes,
  setState: (type: ImagePickerTypes) => void,
) => {
  setState(type);

  if (type === ImagePickerTypes.camera) {
    launchCamera(null, () => undefined);
  }

  if (type === ImagePickerTypes.picker) {
    launchImageLibrary(null, () => undefined);
  }
};

const isSelected = (
  type: ImagePickerTypes,
  condition: ImagePickerTypes
) => type === condition; 

export const ImagePicker = (
  props: IProps
): JSX.Element => {
  const [currentType, setType]= React.useState(ImagePickerTypes.camera)

  const {theme} = props;
  const style = props.style || {};

  const styles = createStyle(theme, applyStyles);

  const isCameraSelected = isSelected(ImagePickerTypes.camera, currentType);
  const isPickerSelected = isSelected(ImagePickerTypes.picker, currentType);

  return (
    <View style={{...styles.container, ...style}}>
      <ImageButton
        source={theme === ThemeTypes.Light ? 
        (
          isCameraSelected ?
          require("../../../../assets/png/light/camera-button-selected-icon.png") :
          require("../../../../assets/png/light/camera-button-icon.png") 
        ) : 
        (
          isCameraSelected ?
          require("../../../../assets/png/dark/camera-button-selected-icon.png") :
          require("../../../../assets/png/dark/camera-button-icon.png") 
        )
      }
        style={styles.image(isCameraSelected)}
        onPress={() => handlePress(ImagePickerTypes.camera, setType)}
      />
      <ImageButton
        source={theme === ThemeTypes.Light ? 
          (
            isPickerSelected ? 
            require("../../../../assets/png/light/image-gallery-button-selected-icon.png") :
            require("../../../../assets/png/light/image-gallery-button-icon.png")
          ) :
          (
            isPickerSelected ? 
            require("../../../../assets/png/dark/image-gallery-button-selected-icon.png") :
            require("../../../../assets/png/dark/image-gallery-button-icon.png")
          )
        }
        style={styles.image(isPickerSelected)}
        onPress={() => handlePress(ImagePickerTypes.picker, setType)}
      />
    </View>
  );
}