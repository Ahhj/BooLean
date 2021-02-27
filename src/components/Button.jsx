import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";

export default function Button({ type, text, Icon, onPress, style }) {
  var buttonStyle = { ...styles.buttonStyle, ...style.buttonStyle };
  buttonStyle = (() => {
    switch (type) {
      case "primary":
        return { ...buttonStyle, ...styles.primaryButtonStyle };
      case "secondary":
        return { ...buttonStyle, ...styles.secondaryButtonStyle };
      case "accept":
        return { ...buttonStyle, ...styles.acceptButtonStyle };
      case "warning":
        return { ...buttonStyle, ...styles.warningButtonStyle };
    }
  })();

  return (
    <TouchableHighlight style={buttonStyle} onPress={onPress}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {Icon ? (
          <Icon size={styles.iconSize} color={styles.iconStyle.color} />
        ) : null}
        <Text style={{ ...styles.textStyle, ...style.textStyle }}>{text}</Text>
      </View>
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
  warningButtonStyle: {
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
  iconSize: 30,
  iconStyle: { color: "white" },
});
