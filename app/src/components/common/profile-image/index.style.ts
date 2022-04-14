import type {ViewStyle, ImageStyle} from "react-native";
import type {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: (hasImage: boolean) =>
    ({
      borderWidth: hasImage ? 6 : 0,
      borderRadius: 400,
      borderColor: theme.color11,
      overflow: "hidden",
    } as ViewStyle),
  image: {
    width: "101%",
    height: "101%",
    borderRadius: 400,
  } as ImageStyle,
  picker: {
    marginTop: 10,
    marginBottom: 10,
  },
});
