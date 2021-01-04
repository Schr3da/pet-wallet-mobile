import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  buttonWrapper: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {},
  buttonText: {
    marginBottom: 0,
    color: theme.color3,
    fontSize: 16,
  }
});
