import {ITheme} from "theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    backgroundColor: theme.color1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 72,
    height: 72,
    marginTop: "10%",
    marginBottom: "10%",
  },
  title: {
    marginBottom: "5%", 
    fontWeight: "bold",
    fontSize: 36,
  },
  text: {
    marginLeft: "10%",
    marginRight: "10%",
    marginBottom: "10%",
    textAlign: "center",
    fontSize: 18,
  }
});
