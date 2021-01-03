import {ITheme} from "../../../theme";

export const applyStyles = (theme: ITheme) => ({ 
  container: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 54,
    padding: 8,
    backgroundColor: theme.color3,
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  text: {
    flex: 2,
    fontSize: 14,
    color: theme.color1,
  },
  button: {
    flexShrink: 0,
    padding: 6,
    borderRadius: 100,
    color: theme.color1,
    backgroundColor: theme.color6,
  }
});
