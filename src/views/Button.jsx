import React from "react";
import { Text, TouchableHighlight, StyleSheet } from "react-native";

export default function Button({ type, text, onPress, style }) {
  var buttonStyle = { ...styles.buttonStyle, ...style.buttonStyle };
  buttonStyle = (() => {
    switch (type) {
      case "primary":
        return { ...buttonStyle, ...styles.primaryButtonStyle };
      case "secondary":
        return { ...buttonStyle, ...styles.secondaryButtonStyle };
      case "accept":
        return { ...buttonStyle, ...styles.acceptButtonStyle };
      case "reject":
        return { ...buttonStyle, ...styles.rejectButtonStyle };
    }
  })();

  return (
    <TouchableHighlight style={buttonStyle} onPress={onPress}>
      <Text style={{ ...styles.textStyle, ...style.textStyle }}>{text}</Text>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  acceptButtonStyle: {
    backgroundColor: "#1FC503",
  },
  rejectButtonStyle: {
    backgroundColor: "#CF1907",
  },
  primaryButtonStyle: {
    backgroundColor: "#0B9CAB",
  },
  secondaryButtonStyle: {
    backgroundColor: "lightgray",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});
