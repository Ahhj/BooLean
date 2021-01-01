import React from "react";
import { TouchableHighlight, View, StyleSheet } from "react-native";
import * as Haptics from "expo-haptics";

export default function BaseCard({ onPress, onLongPress, style, children }) {
  return (
    <View style={{ ...styles.cardView, ...style.cardView }}>
      <TouchableHighlight
        style={{ ...styles.cardButton, ...style.cardButton }}
        onPress={onPress}
        onLongPress={() =>
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).then(
            onLongPress
          )
        }
      >
        {children}
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
