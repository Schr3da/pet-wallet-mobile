import type {ViewStyle} from "react-native";
import type {ITheme} from "../../theme";

export const applyStyles = (theme: ITheme) => ({
  container: {
    flex: 1,
    width: "100%",
  },
  text: {
    fontSize: 16,
    marginBottom: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: theme.color10,
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
    opacity: 0.3,
  },
  languageButtonActive: {
    opacity: 1,
  },
  notificationWrapper: {
    maxWidth: 380,
    marginTop: 10,
  } as ViewStyle,
});
