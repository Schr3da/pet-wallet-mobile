import type {ITheme} from "../theme";

export const applyStyles = (isApplePlatform: boolean) => (theme: ITheme) => ({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.color1,
  },
  container: {
    flex: 1,
    marginTop: isApplePlatform ? 0 : 20,
    marginBottom: isApplePlatform ? 0 : 10,
    marginLeft: 20,
    marginRight: 20,
  },
});
