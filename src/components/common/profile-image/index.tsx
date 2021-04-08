import * as React from "react";

import {ViewStyle, View, Image} from "react-native";

import {IImageDataDto} from "../../../dto/image";
import {createStyle, ThemeTypes} from "../../../theme";
import {base64ImageToUri} from "../utils";
import {ImagePicker} from "../image-picker";
import {ErrorTypes} from "../../../enums/layout";
import {onSetErrorCode} from "../../../store/actions/layout";
import {useDispatch} from "react-redux";

import {applyStyles} from "./index.style";

export const handleError = (dispatch: any, errorType: ErrorTypes) =>
  dispatch(onSetErrorCode(errorType));

interface IProps {
  image: IImageDataDto | string | null;
  isEditing: boolean;
  theme: ThemeTypes;
  style: ViewStyle;
  onNewImage?: (data: IImageDataDto) => void;
}

export const ProfileImage = (props: IProps) => {
  const dispatch = useDispatch();

  const {image, isEditing, style, theme, onNewImage} = props;

  const hasImage = image != null;

  const styles = createStyle(theme, applyStyles);

  return (
    <React.Fragment>
      <View style={{...styles.container(hasImage), ...style}}>
        {hasImage ? (
          <Image
            style={styles.image}
            source={
              typeof image === "string" ? {uri: image} : base64ImageToUri(image)
            }
          />
        ) : (
          <Image
            style={styles.image}
            source={
              theme === ThemeTypes.Light
                ? require("../../../../assets/png/light/new-pet-profile-icon.png")
                : require("../../../../assets/png/dark/new-pet-profile-icon.png")
            }
          />
        )}
      </View>
      {isEditing === false ? null : (
        <ImagePicker
          style={styles.picker}
          theme={theme}
          maxWidth={512}
          maxHeight={512}
          onError={() => handleError(dispatch, ErrorTypes.photoLibrary)}
          onData={(image: IImageDataDto) => {
            onNewImage && onNewImage(image);
          }}
        />
      )}
    </React.Fragment>
  );
};
