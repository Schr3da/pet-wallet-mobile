import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (dataLength: number) => (_: ITheme) => {
  const height = 120;
  const cardOffset = 40;

  return {
    container: {
      width: "100%",
      height: 120,
      maxWidth: 380,
      marginTop: 18,
      marginBottom: 20,
      alignItems: "center",
    } as ViewStyle,
    list: {
      width: "100%",
    } as ViewStyle,
  };
};
