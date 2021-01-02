import {ITheme} from "theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    flex: 1,
    backgroundColor: theme.color1,
    alignItems: "center",
  },
  buttonWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {},
  buttonText: {
    marginBottom: "5%",
    color: theme.color3,
    fontSize: 16,
  }
});
