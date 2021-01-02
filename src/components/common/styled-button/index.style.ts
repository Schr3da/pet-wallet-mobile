export const applyStyles = (
  color: string
) => ({ 
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    color,
  }
});
