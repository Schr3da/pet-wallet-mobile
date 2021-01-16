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
    maxWidth: 180,
    maxHeight: 170,
  },
  picker: {
    marginTop: 20,
    marginBottom: 20,
  },
  inputField: {
    marginBottom: 10,
    width: 280,
  },
  row: {
    display: "flex",
    flexDirection: "row",
    maxWidth: 280,
  } as ViewStyle,
  dateOfBirth: {
    flex: 2,
    marginRight: 10,
    marginBottom: 10,
  },
  age: {
    flex: 1,
    marginBottom: 10,
  }
});
