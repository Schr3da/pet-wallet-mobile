import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    width: "80%",
    height: "40%",
    borderRadius: 12,
    maxHeight: 340,
    maxWidth: 320,
    backgroundColor: theme.color6,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden"
  },
  image: {
    width: "90%",
    height: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    marginBottom: 60,
  }
});
