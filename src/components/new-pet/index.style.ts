import {ViewStyle} from "react-native";

import {ITheme} from "../../theme";

export const applyStyles = (
  _: ITheme
) => ({ 
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  } as ViewStyle,
  inputField: {
    width: 280,
  }
});
