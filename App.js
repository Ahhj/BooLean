import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StackNavigatorScreen from "./src/screens/StackNavigatorScreen";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StackNavigatorScreen style={styles} />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
  top: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  bottom: {
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
});

export default App;
