import type {ViewStyle, ImageStyle} from "react-native";

import {DisplayModes} from "../../../store/actions/layout";

export const applyStyles = (mode: DisplayModes) => ({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 40,
    display: mode === DisplayModes.landscape ? "none" : "flex",
  } as ViewStyle,
  image: {
    width: "100%",
    height: "100%",
  } as ImageStyle,
});
