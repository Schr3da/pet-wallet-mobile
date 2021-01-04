export const applyStyles = (
  color: string
) => ({ 
  container: {
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 12,
    color,
  }
});
