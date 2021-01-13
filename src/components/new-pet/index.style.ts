import {ViewStyle} from "react-native";

import {ITheme} from "../../theme";

export const applyStyles = (
  _: ITheme
) => ({ 
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  } as ViewStyle,
  scrollContainer: {
    flex: 1,
  },
  inputField: {
    marginBottom: 10,
    width: 280,
  }
});
