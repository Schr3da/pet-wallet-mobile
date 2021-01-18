import {ViewStyle} from "react-native";

import {ITheme} from "../../../theme";

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
  placeholderIcon: {
    maxWidth: 112,
    maxHeight: 140,
  },
  picker: {
    marginTop: 20,
    marginBottom: 20,
  },
  attachmentsWrapper: {
    width: 280,
  },
  attachment: {
    marginBottom: 10,
  }
});
