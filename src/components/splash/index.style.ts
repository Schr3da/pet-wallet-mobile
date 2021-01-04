import {ITheme} from "../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    flex: 1,
    backgroundColor: theme.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  appIcon: {
    width: 72,
    height: 72,
  }
});
