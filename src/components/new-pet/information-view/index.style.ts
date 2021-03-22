import type {ViewStyle} from "react-native";

import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
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
    width: 150,
    height: 140,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    backgroundColor: theme.color11,
    borderColor: theme.color11,
  },
  picker: {
    marginTop: 20,
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 10,
  },
});
