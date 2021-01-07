import {ViewStyle} from "react-native";

import {ITheme} from "../../theme";

export const applyStyles = (
  _: ITheme
) => ({ 
  container: {
    flex: 1,
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
  } as ViewStyle,
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    flexDirection: "row",
  } as ViewStyle,
  separator: {
    width: 18,
    height: 28,
  },
  languageButton: {
    width: 48,
    height: 48,
    opacity: 0.5,
  },
  languageButtonActive: {
    opacity: 1,
  }
});
