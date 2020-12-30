import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import CardList from "./src/views/CardList";

const App = () => {
  const data = [
    { id: 1, title: "Hello world!" },
    { id: 2, title: "Goodbye world!" },
    { id: 3, title: "Poopy plop!" },
  ];

  return (
    <SafeAreaView>
      <CardList data={data} numColumns={2} styles={styles} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  button: {
    backgroundColor: "#F194FF",
    borderRadius: 40,
    padding: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  top: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 20,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 0,
  },
});

export default App;
