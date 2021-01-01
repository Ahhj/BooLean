import React from "react";
import { Text, TouchableHighlight, View, StyleSheet } from "react-native";

export default function BaseCard({ data, onPress, style }) {
  return (
    <View style={{ ...styles.cardView, ...style.cardView }}>
      <TouchableHighlight
        style={{ ...styles.cardButton, ...style.cardButton }}
        onPress={onPress}
      >
        <Text style={{ ...styles.textStyle, ...style.textStyle }}>
          {data.title}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  cardView: {
    height: 150,
  },
  cardButton: {
    height: "100%",
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
});
