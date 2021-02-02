import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    width: "100%",
    maxWidth: 380,
  },
  footer: {
    maxWidth: 380,
    position: "relative",
    backgroundColor: theme.color1,
  } as ViewStyle,
  addPetBar: {
    marginTop: 10,
    borderRadius: 100,
  } as ViewStyle,
});
