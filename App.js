import "react-native-gesture-handler";
import React from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import StackScreen from "./src/views/StackScreen";
import WorkoutContextProvider from "./src/providers/WorkoutContextProvider";

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <WorkoutContextProvider>
          <StackScreen style={styles} />
        </WorkoutContextProvider>
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
