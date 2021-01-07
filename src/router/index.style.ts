import {ITheme} from "../theme";

export const applyStyles = (theme: ITheme) => ({
  safeAreaView: {
    flex: 1,
    backgroundColor: theme.color1,
  },
  container: {
    flex: 1,
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 20,
    marginRight: 20,
  },
});
