import React from "react";
import { Text, SafeAreaView } from "react-native";
import TouchableCard from "./TouchableCard";

/**
 * Component to be rendered above the tab bar when a session is active
 * for quick-look and navigation.
 */
export default function SessionBanner({ sessionState, onPress, style }) {
  return (
    <SafeAreaView>
      <TouchableCard
        onPress={onPress}
        style={{
          ...style,
          cardView: { height: 80 },
          cardButton: { borderRadius: 0, backgroundColor: "white" },
        }}
      >
        <Text style={{ color: "black" }}>Hello</Text>
      </TouchableCard>
    </SafeAreaView>
  );
}
