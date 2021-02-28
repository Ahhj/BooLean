export { textStyle, inputStyle };

const textStyle = {
  width: 50,
  height: 50,
  textAlign: "center",
  fontSize: 30,
  marginTop: 6,
  marginBottom: 6,
};

const inputStyle = {
  ...textStyle,
  marginTop: 5,
  marginBottom: 5,
  borderRadius: 10,
  borderStyle: "solid",
  borderColor: "black",
  borderWidth: 1,
};
