import {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (
  _: ITheme
) => ({
  container: {
    width: "100%",
    height: 180,
    maxWidth: 380,
    marginTop: 18,
    marginBottom: 20,
    alignItems: "center",
  } as ViewStyle,
  list: {
    width: "100%",
  } as ViewStyle,
});
