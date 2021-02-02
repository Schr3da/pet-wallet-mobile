import {off} from "process";
import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (dataLength: number) => (_: ITheme) => {
  const height = 120;
  const cardOffset = 40;
  const totalHeight = height + cardOffset;

  return {
    container: {
      width: "100%",
      maxWidth: 380,
      marginTop: 18,
      marginBottom: 20,
      alignItems: "center",
    } as ViewStyle,
    list: {
      width: "100%",
    } as ViewStyle,
    cardWrapper: {
      height: height + cardOffset * dataLength,
    },
    card: {
      marginBottom: 20,
    },
  };
};
